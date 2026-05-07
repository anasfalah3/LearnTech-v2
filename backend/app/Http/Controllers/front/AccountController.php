<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Chapter;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Lesson;
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
                'id' => Auth::user()->id,

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
            ->get();
        return response()->json([
            'status' => 200,
            'courses' => $courses
        ], 200);
    }
    public function enrollments(Request $request)
    {
        $enrollments = Enrollment::where('user_id', $request->user()->id)
            ->with(['course', 'course.level'])
            ->get();
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

        return response()->json([
            'status' => 200,
            'data' => $course,
            'activeLesson' => $activeLesson
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
}
