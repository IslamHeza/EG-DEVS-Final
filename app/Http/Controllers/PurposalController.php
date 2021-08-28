<?php

namespace App\Http\Controllers;
use App\Models\Purposal;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\DB;
use App\Events\NewNotification;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PurposalController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
   /* public function index()
    {
        return purposal::all();
    }*/

    public function index($id)
    {
        $purposals = Purposal::join('projects', 'purposals.project_id', '=', 'projects.id')
            ->join('users', 'users.id', '=', 'purposals.developer_id')
            ->where('projects.id',$id)
            ->select('users.name', 'users.lname', 'users.image' ,'projects.title as title', 'purposals.*')
            ->get();

        return ($purposals);
    }

 /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */ 
    

    public function store(Request $request)
    { 
        // insert a purposal into database 
       $proposal = Purposal::create($request->all());
    }
        // insert notification in database
     /*   Notification::create([
            'user_id' => $proposal->owner_id,
            'purposal_id' => $proposal->id,
            'message' => Auth::user()->username . ' Accepted purposal'
        ]);
         
         broadcast(new NewNotification($request->all()));
          return [
              'owner_id'=>$proposal->owner_id,
              'message' => Auth::user()->username . ' Accepted purposal',
          ];
    }  */
        /*$purposal=new Purposal();
        $purposal->cover_letter = $request-> cover_letter;
        $purposal->budget = $request-> budget;
        $purposal->time = $request-> time;
        $purposal->owner_id = $request->owner_id;
        $purposal->developer_id = $request->developer_id;
        $purposal->project_id = $request-> project_id;
        $purposal->save();
       // return Purposal::create($request->all());
        $data =[
             
           'cover_letter'=>$request-> cover_letter,
           'budget'=>$request-> budget,
           'time'=>$request-> time,
           'owner_id'=>$request-> owner_id,
           'developer_id'=>$request-> developer_id,
           'project_id'=>$request-> project_id,        
        ];

        broadcast(new NewNotification($data));

        return redirect() -> back()  
    }*/

 /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
   /* public function show($id)
    {
        return project::find($id);
    }*/

    public function getPurposal($id)
    {
        $purposal = Purposal::join('projects', 'purposals.project_id', '=', 'projects.id')
            ->join('users', 'users.id', '=', 'purposals.developer_id')
            ->where('purposals.id', $id)
            ->select('users.name', 'users.lname', 'users.image' ,'projects.title as title', 'purposals.*')
            ->first();
        return $purposal;
    }

  /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, $id)
    {
        $purposal = Purposal::find($id);
        return $purposal->update($request->all());
    }


     /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Purposal::destroy($id);
    }
}
