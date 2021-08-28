<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;
class NewNotification implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $cover_letter;
    public $budget;
    public $comment;
    public $time ;
    public $wner_id;
    public $developer_id;
    public $project_id;
     
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this ->cover_letter=$data['cover_letter'];
        $this ->budget=$data['budget'];
        $this ->comment=$data['comment'];
        $this ->wner_id=$data['wner_id'];
        $this ->developer_id=$data['developer_id'];
        $this ->project_id=$data['project_id'];
        $this->time = date("h:i A", strtotime(Carbon::now()));
         

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('new-notification');
    }
}
