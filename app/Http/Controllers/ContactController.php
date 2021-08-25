<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller{
  

    public function store(Request $request)
    {
        return (Contact::create($request->all()));

    
}
}