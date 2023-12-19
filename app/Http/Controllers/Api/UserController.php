<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\AdminLoginRequest;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{

    public function login(AdminLoginRequest $request)
    {

        if (Auth::attempt(array_merge($request->only('email', 'password'),['is_admin' => true]))) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json(['token' => $token], 200);
        }

        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }


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
        $visited = []; // Keep track of visited users

        foreach ($users as $index1 => $user1) {
            foreach ($users as $index2 => $user2) {
                // Check if users are not the same and have not been visited before
                if ($index1 !== $index2 && !in_array($index1, $visited) && !in_array($index2, $visited) && ($user1['age'] + $user2['age'] === $targetSum)) {
                    $pairs[] = [$user1, $user2];
                    // Mark users as visited
                    $visited[] = $index1;
                    $visited[] = $index2;
                }
            }
        }
        return $pairs;
    }

//
//    function findUserPairsByAgeSum(array $users, $targetSum): array {
//        $pairs = [];
//
//
//        foreach ($users as $index1 => $user1) {
//
//            foreach ($users as $index2 => $user2) {
//
//                if ($index1 !== $index2 && ($user1['age'] + $user2['age'] === $targetSum)) {
//                    $pairs[] = [$user1, $user2];
//                }
//            }
//        }
//
//        return $pairs;
//    }




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
