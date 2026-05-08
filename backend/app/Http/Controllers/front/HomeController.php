<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Language;
use App\Models\Level;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function fetchCategories()
    {
        $categories = Category::orderBy('name', 'asc')
            ->where('status', 1)
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $categories
        ], 200);
    }
    public function fetchLevels()
    {
        $levels = Level::orderBy('created_at', 'asc')
            ->where('status', 1)
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $levels
        ], 200);
    }
    public function fetchLanguages()
    {
        $languages = Language::orderBy('created_at', 'asc')
            ->where('status', 1)
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $languages
        ], 200);
    }
    public function fetchFeaturedCourses()
    {
        $courses = Course::orderBy('title', 'asc')
            ->with('level')
            ->withCount('reviews')
            ->withSum('reviews', 'rating')
            ->where('is_featured', 'yes')
            ->where('status', 1)
            ->get();

        $courses->map(function ($course) {
            $course->rating = $course->reviews_count > 0 ?
                number_format(($course->reviews_sum_rating / $course->reviews_count), 1) : "0.0";
        });
        return response()->json([
            'status' => 200,
            'data' => $courses
        ], 200);
    }
    public function courses(Request $request)
    {
        $courses = Course::where('status', 1)
            ->with('level')
            ->withCount('reviews')
            ->withSum('reviews', 'rating');
        //Filter courses by keyword
        if (!empty($request->keyword)) {
            $courses = $courses->where('title', 'like', '%' . $request->keyword . '%');
        }
        //Filter courses by category
        if (!empty($request->category)) {
            $categoryArr = explode(',', $request->category);
            if (!empty($categoryArr)) {
                $courses = $courses->whereIn('category_id', $categoryArr);
            }
        }
        //Filter courses by level
        if (!empty($request->level)) {
            $levelArr = explode(',', $request->level);
            if (!empty($levelArr)) {
                $courses = $courses->whereIn('level_id', $levelArr);
            }
        }
        //Filter courses by language
        if (!empty($request->language)) {
            $languageArr = explode(',', $request->language);
            if (!empty($languageArr)) {
                $courses = $courses->whereIn('language_id', $languageArr);
            }
        }

        if (!empty($request->sort)) {
            $sortArr = ['asc', 'desc'];
            if (in_array($request->sort, $sortArr)) {
                $courses = $courses->orderBy('created_at', $request->sort);
            } else {
                $courses = $courses->orderBy('created_at', 'desc');
            }
        }

        $courses = $courses->get();

        $courses->map(function ($course) {
            $course->rating = $course->reviews_count > 0 ?
                number_format(($course->reviews_sum_rating / $course->reviews_count), 1) : "0.0";
        });

        return response()->json([
            'status' => 200,
            'data' => $courses
        ], 200);
    }
    public function course($id)
    {
        $course = Course::where('id', $id)
            ->withCount('chapters')
            ->withCount('reviews')
            ->withSum('reviews', 'rating')
            ->with([
                'reviews',
                'reviews.user',
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
                'outcomes',
                'requirements'
            ])
            ->first();
        if ($course == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Course not found'
            ], 404);
        }

        $totalDuration = $course->chapters->sum('lessons_sum_duration');
        $totalLessons = $course->chapters->sum('lessons_count');

        $course->total_duration = $totalDuration;
        $course->total_lessons = $totalLessons;

        $course->rating = $course->reviews_count > 0 ?
            number_format(($course->reviews_sum_rating / $course->reviews_count), 1) : "0.0";

        return response()->json([
            'status' => 200,
            'data' => $course
        ], 200);
    }
    public function enroll(Request $request)
    {
        $course = Course::find($request->course_id);
        if ($course == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Course not found'
            ], 404);
        }
        $count = Enrollment::where([
            'user_id' => $request->user()->id,
            'course_id' => $request->course_id
        ])->count();

        if ($count > 0) {
            return response()->json([
                'status' => 409,
                'message' => 'You are already enrolled in this course'
            ], 409);
        }
        $enrollment = new Enrollment();
        $enrollment->user_id = $request->user()->id;
        $enrollment->course_id = $request->course_id;
        $enrollment->save();

        return response()->json([
            'status' => 200,
            'data' => $course,
            'message' => 'You have successfully enrolled'
        ], 200);
    }
}
