<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Chapter;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\Review;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|min:8',
        ]);
        // this will return a json response with the validation errors if the validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role = 'user'; // Set default role
        $user->save();

        // $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 200,
            'message' => 'User registered successfully',
            // 'access_token' => $token,
            // 'token_type' => 'Bearer',
        ], 200);
    }
    public function authenticate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required',
        ]);
        // this will return a json response with the validation errors if the validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = User::find(Auth::user()->id);
            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'status' => 200,
                'token' => $token,
                'name' => $user->name,
                'email' => $user->email,
                'id' => Auth::user()->id,
                'role' => $user->role,
            ], 200);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid email or password'
            ], 401);
        }
    }
    public function courses(Request $request)
    {
        $courses = Course::where('user_id', $request->user()->id)
            ->with('level')
            ->withCount('reviews')
            ->withSum('reviews', 'rating')
            ->withCount('enrollments')
            ->get();

        $courses->map(function ($course) {
            $course->rating = $course->reviews_count > 0 ?
                number_format(($course->reviews_sum_rating / $course->reviews_count), 1) : "0.0";
        });
        return response()->json([
            'status' => 200,
            'courses' => $courses
        ], 200);
    }
    public function enrollments(Request $request)
    {
        $enrollments = Enrollment::where('user_id', $request->user()->id)
            ->with(['course' => function ($query) {
                $query->withCount('reviews');
                $query->withSum('reviews', 'rating');
                $query->withCount('enrollments');
            }, 'course.level'])
            ->get();

        $enrollments->map(function ($enrollment) {
            $enrollment->course->rating = $enrollment->course->reviews_count > 0 ?
                number_format(($enrollment->course->reviews_sum_rating / $enrollment->course->reviews_count), 1) : "0.0";
        });

        return response()->json([
            'status' => 200,
            'data' => $enrollments
        ], 200);
    }
    public function course($id, Request $request)
    {
        $count = Enrollment::where([
            'user_id' => $request->user()->id,
            'course_id' => $id
        ])->count();

        if ($count == 0) {
            return response()->json([
                'status' => 404,
                'message' => 'You can not access this course'
            ], 404);
        }

        $course = Course::where('id', $id)
            ->withCount('chapters')
            ->with([
                'category',
                'level',
                'language',
                'chapters' => function ($query) {
                    $query->withCount(['lessons' => function ($q) {
                        $q->where('status', 1);
                        $q->whereNotNull('video');
                    }]);
                    $query->withSum(['lessons' => function ($q) {
                        $q->where('status', 1);
                        $q->whereNotNull('video');
                    }], 'duration');
                },
                'chapters.lessons' => function ($query) {
                    $query->where('status', 1);
                    $query->whereNotNull('video');
                },
            ])
            ->first();

        if ($course == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Course not found'
            ], 404);
        }

        $totalLessons = $course->chapters->sum('lessons_count');

        $activeLesson = collect();

        //if no activity saved then show first lesson of first chapter
        $activityCount = Activity::where([
            'user_id' => $request->user()->id,
            'course_id' => $id
        ])->count();

        if ($activityCount == 0) {

            $chapter = Chapter::where('course_id', $id)
                ->orderBy('sort_order', 'asc')
                ->first();

            $lesson = Lesson::where('chapter_id', $chapter->id)
                ->where('status', 1)
                ->whereNotNull('video')
                ->orderBy('sort_order', 'asc')
                ->first();

            $activity = new Activity();
            $activity->course_id = $id;
            $activity->user_id = $request->user()->id;
            $activity->course_id = $id;
            $activity->chapter_id = $chapter->id;
            $activity->lesson_id = $lesson->id;
            $activity->is_last_watched = "yes";
            $activity->save();

            $activeLesson = $lesson;
        } else {
            $activity = Activity::where([
                'user_id' => $request->user()->id,
                'course_id' => $id,
                'is_last_watched' => 'yes'
            ])->first();

            $activeLesson = Lesson::where('id', $activity->lesson_id)->first();
        }

        //Fetch lessons which are completed
        $completedLessons = Activity::where([
            'user_id' => $request->user()->id,
            'course_id' => $id,
            'is_completed' => 'yes'
        ])->pluck('lesson_id')->toArray();


        $completedLessonsCount = Activity::where([
            'user_id' => $request->user()->id,
            'course_id' => $id,
            'is_completed' => 'yes'
        ])->count();

        $progress = round(($completedLessonsCount / $totalLessons) * 100);



        return response()->json([
            'status' => 200,
            'data' => $course,
            'progress' => $progress,
            'activeLesson' => $activeLesson,
            'completedLessons' => $completedLessons
        ], 200);
    }

    public function saveUserActivity(Request $request)
    {
        Activity::where([
            'user_id' => $request->user()->id,
            'course_id' => $request->course_id
        ])->update([
            'is_last_watched' => 'no'
        ]);

        Activity::updateOrInsert(
            [
                'user_id' => $request->user()->id,
                'course_id' => $request->course_id,
                'lesson_id' => $request->lesson_id,
                'chapter_id' => $request->chapter_id
            ],
            [
                'is_last_watched' => 'yes'
            ]
        );

        return response()->json([
            'status' => 200,
            'message' => "User activity saved successfully",
        ], 200);
    }

    public function markAsComplete(Request $request)
    {
        Activity::where([
            'user_id' => $request->user()->id,
            'course_id' => $request->course_id,
            'lesson_id' => $request->lesson_id,
            'chapter_id' => $request->chapter_id
        ])->update([
            'is_completed' => 'yes'
        ]);

        //Fetch lessons which are completed
        $completedLessons = Activity::where([
            'user_id' => $request->user()->id,
            'course_id' => $request->course_id,
            'is_completed' => 'yes'
        ])->pluck('lesson_id')->toArray();

        $course = Course::where('id', $request->course_id)
            ->withCount('chapters')
            ->with([
                'chapters' => function ($query) {
                    $query->withCount(['lessons' => function ($q) {
                        $q->where('status', 1);
                        $q->whereNotNull('video');
                    }]);
                    $query->withSum(['lessons' => function ($q) {
                        $q->where('status', 1);
                        $q->whereNotNull('video');
                    }], 'duration');
                },
                'chapters.lessons' => function ($query) {
                    $query->where('status', 1);
                    $query->whereNotNull('video');
                },
            ])
            ->first();

        $totalLessons = $course->chapters->sum('lessons_count');

        $completedLessonsCount = Activity::where([
            'user_id' => $request->user()->id,
            'course_id' => $request->course_id,
            'is_completed' => 'yes'
        ])->count();

        $progress = round(($completedLessonsCount / $totalLessons) * 100);

        return response()->json([
            'status' => 200,
            'completedLessons' => $completedLessons,
            'progress' => $progress,
            'message' => "Lesson marked as complete successfully",
        ], 200);
    }

    public function saveRating(Request $request)
    {

        $course = Course::find($request->course_id);
        if ($course == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Course not found'
            ], 404);
        }

        $count = Review::where([
            'user_id' => $request->user()->id,
            'course_id' => $request->course_id
        ])->count();

        if ($count > 0) {
            return response()->json([
                'status' => 200,
                'message' => 'You have already rated this course'
            ], 200);
        }

        $review = new Review();
        $review->user_id = $request->user()->id;
        $review->course_id = $request->course_id;
        $review->rating = $request->rating;
        $review->comment = $request->comment;
        $review->status = 1;
        $review->save();

        return response()->json([
            'status' => 200,
            'message' => 'Thank you for your feedback'
        ], 200);
    }

    public function fetchUser(Request $request)
    {
        $user = User::find($request->user()->id);
        if ($user == null) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found'
            ], 404);
        }
        return response()->json([
            'status' => 200,
            'data' => $user
        ], 200);
    }

    public function updatehUser(Request $request)
    {
        $user = User::find($request->user()->id);
        if ($user == null) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $request->user()->id . ',id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'Profile updated successfully'
        ], 200);
    }

    public function updatePassword(Request $request)
    {
        $user = User::find($request->user()->id);
        if ($user == null) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        //Match old password
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'status' => 400,
                'errors' => ['old_password' => ['The Old password is incorrect']]
            ], 400);
        }

        $user->password = $request->new_password;
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'Password has been updated successfully'
        ], 200);
    }
}
