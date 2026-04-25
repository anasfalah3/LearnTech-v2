<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Outcome;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OutcomeController extends Controller
{
    //This Method will return all the outcomes of a course
    public function index(Request $request)
    {
        $outcomes = Outcome::where('course_id', $request->course_id)->get();
        return response()->json([
            'status' => '200',
            'data' => $outcomes
        ], 200);
    }

    //This Method will store/save an outcome
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'outcome' => 'required',
            'course_id' => 'required|exists:courses,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => '400',
                'errors' => $validator->errors()
            ], 400);
        }

        $outcome = new Outcome();
        $outcome->course_id = $request->course_id;
        $outcome->text = $request->outcome;
        $outcome->sort_order = 1000;
        $outcome->save();

        return response()->json([
            'status' => '200',
            'message' => 'Outcome addedd successfully',
        ], 200);
    }

    //This Method will update an outcome
    public function update($id, Request $request)
    {
        $outcome = Outcome::find($id);
        if ($outcome == null) {
            return response()->json([
                'status' => '404',
                'message' => 'Outcome not found',
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'outcome' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => '400',
                'errors' => $validator->errors()
            ], 400);
        }

        $outcome->text = $request->outcome;
        $outcome->save();

        return response()->json([
            'status' => '200',
            'message' => 'Outcome updated successfully',
        ], 200);
    }

    //This Method will delete an outcome
    public function destroy($id)
    {
        $outcome = Outcome::find($id);
        if ($outcome == null) {
            return response()->json([
                'status' => '404',
                'message' => 'Outcome not found',
            ], 404);
        }

        $outcome->delete();

        return response()->json([
            'status' => '200',
            'message' => 'Outcome deleted successfully',
        ], 200);
    }
}
