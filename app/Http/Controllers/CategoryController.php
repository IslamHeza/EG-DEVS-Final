<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $catagories=Category::all();

        return  $catagories;
    }

    public function show($name){
        $users = User::join('categories', 'users.category_id', '=', 'categories.id')
        ->join('reviews' , 'users.id' , '=' , 'reviews.ratee_id')
        ->select('users.*', 'categories.name as categeroyName ','reviews.rate as reviewsrate' )
        ->where('users.type','developer')
        ->where('categories.name' ,$name)
        ->orderBy('reviews.rate', 'DESC')
        ->get();

        return $users  ;
    }
}
