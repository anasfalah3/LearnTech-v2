<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Course;
use App\Models\Level;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    /**
     * Check if user is admin middleware
     */
    private function checkAdmin()
    {
        if (!Auth::check() || !Auth::user()->isAdmin()) {
            return response()->json([
                'status' => 403,
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }
        return null;
    }

    // ==================== CATEGORIES ====================
    /**
     * Get all categories
     */
    public function getAllCategories()
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        $categories = Category::all();
        return response()->json([
            'status' => 200,
            'data' => $categories
        ], 200);
    }

    /**
     * Create a new category
     */
    public function storeCategory(Request $request)
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categories'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $category = new Category();
        $category->name = $request->name;
        $category->save();

        return response()->json([
            'status' => 201,
            'message' => 'Category created successfully',
            'data' => $category
        ], 201);
    }

    /**
     * Update category
     */
    public function updateCategory(Request $request, $id)
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categories,name,' . $id
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $category->name = $request->name;
        $category->save();

        return response()->json([
            'status' => 200,
            'message' => 'Category updated successfully',
            'data' => $category
        ], 200);
    }

    /**
     * Delete category
     */
    public function destroyCategory($id)
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found'
            ], 404);
        }

        $category->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Category deleted successfully'
        ], 200);
    }

    // ==================== LEVELS ====================
    /**
     * Get all levels
     */
    public function getAllLevels()
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        $levels = Level::all();
        return response()->json([
            'status' => 200,
            'data' => $levels
        ], 200);
    }

    /**
     * Create a new level
     */
    public function storeLevel(Request $request)
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:levels'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $level = new Level();
        $level->name = $request->name;
        $level->save();

        return response()->json([
            'status' => 201,
            'message' => 'Level created successfully',
            'data' => $level
        ], 201);
    }

    /**
     * Update level
     */
    public function updateLevel(Request $request, $id)
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        $level = Level::find($id);
        if (!$level) {
            return response()->json([
                'status' => 404,
                'message' => 'Level not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:levels,name,' . $id
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $level->name = $request->name;
        $level->save();

        return response()->json([
            'status' => 200,
            'message' => 'Level updated successfully',
            'data' => $level
        ], 200);
    }

    /**
     * Delete level
     */
    public function destroyLevel($id)
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        $level = Level::find($id);
        if (!$level) {
            return response()->json([
                'status' => 404,
                'message' => 'Level not found'
            ], 404);
        }

        $level->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Level deleted successfully'
        ], 200);
    }

    // ==================== USERS ====================
    /**
     * Get all users
     */
    public function getAllUsers(Request $request)
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        $users = User::select('id', 'name', 'email', 'role', 'created_at')
            ->paginate($request->get('per_page', 10));

        return response()->json([
            'status' => 200,
            'data' => $users
        ], 200);
    }

    /**
     * Update user role
     */
    public function updateUserRole(Request $request, $id)
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'role' => 'required|in:user,admin'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $user->role = $request->role;
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'User role updated successfully',
            'data' => $user
        ], 200);
    }

    /**
     * Delete user
     */
    public function destroyUser($id)
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        if ($id == Auth::user()->id) {
            return response()->json([
                'status' => 400,
                'message' => 'Cannot delete your own account'
            ], 400);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'status' => 200,
            'message' => 'User deleted successfully'
        ], 200);
    }

    // ==================== COURSES ====================
    /**
     * Get all courses (admin view)
     */
    public function getAllCourses(Request $request)
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        $courses = Course::with(['category', 'level', 'language', 'enrollments'])
            ->select('id', 'title', 'category_id', 'level_id', 'language_id', 'status', 'created_at')
            ->paginate($request->get('per_page', 10));

        return response()->json([
            'status' => 200,
            'data' => $courses
        ], 200);
    }

    /**
     * Update course status
     */
    public function updateCourseStatus(Request $request, $id)
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        $course = Course::find($id);
        if (!$course) {
            return response()->json([
                'status' => 404,
                'message' => 'Course not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:draft,published,archived'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $course->status = $request->status;
        $course->save();

        return response()->json([
            'status' => 200,
            'message' => 'Course status updated successfully',
            'data' => $course
        ], 200);
    }

    /**
     * Get course details with enrollments
     */
    public function getCourseDetails($id)
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        $course = Course::with(['category', 'level', 'language', 'enrollments', 'reviews'])->find($id);
        if (!$course) {
            return response()->json([
                'status' => 404,
                'message' => 'Course not found'
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $course
        ], 200);
    }

    /**
     * Delete course
     */
    public function destroyCourse($id)
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        $course = Course::find($id);
        if (!$course) {
            return response()->json([
                'status' => 404,
                'message' => 'Course not found'
            ], 404);
        }

        $course->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Course deleted successfully'
        ], 200);
    }

    // ==================== STATISTICS ====================
    /**
     * Get admin dashboard statistics
     */
    public function getDashboardStats()
    {
        $adminCheck = $this->checkAdmin();
        if ($adminCheck) {
            return $adminCheck;
        }

        $stats = [
            'total_users' => User::count(),
            'total_courses' => Course::count(),
            'total_categories' => Category::count(),
            'total_levels' => Level::count(),
            'total_admins' => User::where('role', 'admin')->count(),
            'published_courses' => Course::where('status', 'published')->count(),
            'recent_users' => User::latest()->take(5)->get(['id', 'name', 'email', 'role', 'created_at']),
        ];

        return response()->json([
            'status' => 200,
            'data' => $stats
        ], 200);
    }
}
