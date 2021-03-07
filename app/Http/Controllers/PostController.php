<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllPosts()
    {
        $userAuth=auth('api')->user();
        if($userAuth){
            $posts = Post::orderBy('created_at', 'desc')->with('user')->get();
         //   $newDateFormat3 = Carb::parse($posts->created_at)->format('d/m/Y');
    //  /    $newDateFormat2 = date('d/m/Y', strtotime($posts->created_at));
           // $posts = Post::all();
           return response()->json($posts);
        }
        return response()->json('Not authorized,need a valid token',403);
       
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(),[
            'status' =>'required|string|min:3',
            
        ]);
    
        if ($validator->fails()) {
            return  response()->json($validator->errors(), 422);
        }
        $userAuth=auth('api')->user();
        if($userAuth){
            $post = new Post([
                'status' => $request->get('status'),
                'user_id' =>    $userAuth->id
            ]);
            $post->save();  
            return response()->json([
                'status'=>'success',
                'message'=>'Post Added Successfully'
            ],200);

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
        $userAuth=auth('api')->user();
        if($userAuth){
            $post = Post::find($id);
            if( $post){
                return response()->json($post);
            }
            return response()->json('Post not found',404);
        }
        return response()->json('Not authorized,need a valid token',403);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
       
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $userAuth=auth('api')->user();
        if($userAuth){
            $post = Post::find($id);
            $post->status = $request->get('status');
            $post->save();


            return response()->json('Post Updated Successfully.');
        }
        return response()->json('Not authorized,need a valid token',403);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function deletePost($id)
    {
        $post = Post::find($id);

      //  $post->delete();
        $userAuth=auth('api')->user();
        if($userAuth){
           // $post = Post::find($id);
            if($post){
                if($post->user_id!== $userAuth->id){
                    return response()->json([
                        'status'=>'error',
                        'message'=>'You can\'t delete this post,this is not your post'
                    ],401);
                }
                $post->delete();
                return response()->json([
                    'status'=>'success',
                    'message'=>'Post Deleted Successfully'
                ],200);
            }  
            return response()->json([
                'status'=>'error',
                'message'=>'Post not found'
            ],404);
           
        }
        return response()->json('Not authorized,need a valid token',403);
    }
}
