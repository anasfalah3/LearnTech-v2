<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class LessonController extends Controller
{
    //This Method will store/save a lesson
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'chapter' => 'required',
            'lesson' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => '400',
                'errors' => $validator->errors()
            ], 400);
        }

        $lesson = new Lesson();
        $lesson->chapter_id = $request->chapter;
        $lesson->title = $request->lesson;
        $lesson->sort_order = 1000;
        $lesson->status = $request->status;
        $lesson->save();

        return response()->json([
            'status' => '200',
            'data' => $lesson,
            'message' => 'Lesson added successfully',
        ], 200);
    }
    // This Method will fetch lesson data
    public function show($id)
    {
        $lesson = Lesson::find($id);
        if ($lesson == null) {
            return response()->json([
                'status' => '404',
                'message' => 'Lesson not found',
            ], 404);
        }

        return response()->json([
            'status' => '200',
            'data' => $lesson,
        ], 200);
    }
    // This Method will update a lesson
    public function update($id, Request $request)
    {
        $lesson = Lesson::find($id);
        if ($lesson == null) {
            return response()->json([
                'status' => '400',
                'errors' => 'Lesson not found'
            ], 400);
        }
        $validator = Validator::make($request->all(), [
            'chapter_id' => 'required',
            'lesson' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => '400',
                'errors' => $validator->errors()
            ], 400);
        }

        $lesson->chapter_id = $request->chapter_id;
        $lesson->title = $request->lesson;
        $lesson->is_free_preview = $request->is_free_preview;
        $lesson->is_free_preview = ($request->free_preview == false) ? 'no' : 'yes';
        $lesson->duration = $request->duration;
        $lesson->description = $request->description;
        $lesson->status = $request->status;
        $lesson->save();

        return response()->json([
            'status' => '200',
            'data' => $lesson,
            'message' => 'Lesson updated successfully',
        ], 200);
    }
    // This Method will delete a lesson
    public function destroy($id)
    {
        $lesson = Lesson::find($id);
        if ($lesson == null) {
            return response()->json([
                'status' => '404',
                'message' => 'Lesson not found',
            ], 404);
        }

        $lesson->delete();

        return response()->json([
            'status' => '200',
            'message' => 'Lesson deleted successfully',
        ], 200);
    }

    // This Method will upload lesson video
    public function saveVideo($id, Request $request)
    {
        $lesson = Lesson::find($id);
        if ($lesson == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Lesson not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'video' => 'required|mimes:mp4',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }
        if ($lesson->video != "") {
            if (File::exists(public_path('uploads/course/videos/' . $lesson->video))) {
                File::delete(public_path('uploads/course/videos/' . $lesson->video));
            }
        }

        $video = $request->video;
        $ext = $video->getClientOriginalExtension();
        $videoName = strtotime('now') . '-' . $id . '.' . $ext;

        $video->move(public_path('uploads/course/videos'), $videoName);

        $lesson->video = $videoName;
        $lesson->save();

        return response()->json([
            'status' => 200,
            'data' => $lesson,
            'message' => 'Video uploaded successfully'
        ], 200);
    }
}
