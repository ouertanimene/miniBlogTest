<?php

namespace App\Http\Controllers;

use App\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllComments($id)
    {
      
        $comments = Comment::orderBy('created_at', 'desc')->with('user')->where('post_id',$id)->get();
        return response()->json($comments);
    }


    public function getCommentsByPost()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $userAuth=auth('api')->user();
        if($userAuth){
            $comment = new Comment([ 
                'body' => $request->get('body'),
                'post_id' => $request->get('post_id'),
                'user_id' => $userAuth->id
            ]);
            $comment->save();
            return response()->json('Comment Added Successfully.');
        }
        return response()->json('Not authorized,need a valid token',403);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $comment = Comment::find($id);
        if( $comment){
            return response()->json($comment);
        }
        return response()->json('Comment not found',404);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function deleteComment($id)
    {
        $userAuth=auth('api')->user();
        $comment = Comment::find($id);
     //   $comment->delete();
        if($userAuth){
           
            if($comment){
                if($comment->user_id!== $userAuth->id){
                    return response()->json([
                        'status'=>'error',
                        'message'=>'You can\'t delete this comment,this is not your comment'
                    ],401);
                }
                $comment->delete();
                return response()->json([
                    'status'=>'success',
                    'message'=>'Comment Deleted Successfully'
                ],200);
            }  
            return response()->json([
                'status'=>'error',
                'message'=>'Comment not found'
            ],404);
           
        }
        return response()->json('Not authorized,need a valid token',403);
        }
}
