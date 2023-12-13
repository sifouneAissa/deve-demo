<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{


    function searchUsers(Request $request)
    {
        $searchString = $request->input('keyword');

        $searchResults = User::query()->where(function ($query) use ($searchString) {
            $query->where('name', 'like', "%$searchString%")
                ->orWhere('email', 'like', "%$searchString%");
         })
            ->where('is_admin', false)
            ->select(['id','name','email','birth'])
            ->get();

        return response()->json($searchResults);
    }

    function pairsUsers(Request $request){

        $targetSum = $request->get('target');

        $users  = User::query()->select(['id','name','email','birth'])->where('is_admin',false)->get();

        $users = $this->findUserPairsByAgeSum($users->toArray(),intval($targetSum));

        return response()->json($users);
    }



    function findUserPairsByAgeSum(array $users, $targetSum): array {
        $pairs = [];

        foreach ($users as $index1 => $user1) {

            foreach ($users as $index2 => $user2) {
                if ($index1 !== $index2 && ($user1['age'] + $user2['age'] === $targetSum)) {

                    $pairs[] = [$user1, $user2];
                }
            }
        }

        return $pairs;
    }


    public function dUsers()
    {
        $ageRanges = [];

        // Define age ranges and initialize counters
        $ageRanges[] = ['range' => '0-15', 'count' => 0];
        $ageRanges[] = ['range' => '16-30', 'count' => 0];
        $ageRanges[] = ['range' => '31-45', 'count' => 0];
        $ageRanges[] = ['range' => '45-75', 'count' => 0];
        // Add more ranges as needed...

        $users = User::query()->where('is_admin',false)->get();

        foreach ($users as $user) {
            $age = $user->age;
            if ($age <= 15) {
                $ageRanges[0]['count']++;
            } elseif ($age >= 16 && $age <= 30) {
                $ageRanges[1]['count']++;
            } elseif ($age >= 31 && $age <= 45) {
                $ageRanges[2]['count']++;
            }elseif ($age >= 45 && $age <= 75) {
                $ageRanges[3]['count']++;
            }
            // Add more conditions for other age ranges...
        }

        return response()->json(['ageDistribution' => $ageRanges]);
    }
}
