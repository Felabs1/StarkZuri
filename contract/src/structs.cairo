use starknet::ContractAddress;
#[derive(Drop, Serde, starknet::Store)]
pub struct User {
    pub userId: ContractAddress,
    pub name: felt252,
    pub username: felt252,
    pub about: ByteArray,
    pub profile_pic: ByteArray,
    pub cover_photo: ByteArray,
    pub date_registered: u64,
    pub no_of_followers: u8,
    pub number_following: u8,
    pub notifications: u256,
    pub zuri_points: u256,
}

#[derive(Drop, Serde)]
pub struct LightUser {
    pub userId: ContractAddress,
    pub name: felt252,
    pub username: felt252,
    pub profile_pic: ByteArray,
    pub zuri_points: u256,
}


#[derive(Drop, Serde, starknet::Store)]
pub struct Post {
    #[key]
    pub postId: u256,
    pub caller: ContractAddress,
    pub content: ByteArray,
    pub likes: u8,
    pub comments: u256,
    pub shares: u8,
    pub images: ByteArray,
    pub zuri_points: u256,
    pub date_posted: u64
    // images and video links will be stored in Legacy Maps for now
}

#[derive(Drop, Serde)]
pub struct PostView {
    #[key]
    pub postId: u256,
    pub author: LightUser,
    pub content: ByteArray,
    pub likes: u8,
    pub comments: u256,
    pub shares: u8,
    pub images: ByteArray,
    pub zuri_points: u256,
    pub date_posted: u64
    // images and video links will be stored in Legacy Maps for now
}

#[derive(Drop, Serde, starknet::Store)]
pub struct Comment {
    pub postId: u256,
    pub commentId: u256,
    pub caller: ContractAddress,
    pub content: ByteArray,
    pub likes: u8,
    pub replies: u8,
    pub time_commented: u64,
    pub zuri_points: u256,
}

#[derive(Drop, Serde, starknet::Store)]
pub struct Community {
    pub community_id: u256,
    pub community_admin: ContractAddress,
    pub community_name: felt252,
    pub description: ByteArray,
    pub members: u256,
    pub online_members: u256,
    pub profile_image: ByteArray,
    pub cover_image: ByteArray,
    pub zuri_points: u256,
}

#[derive(Drop, Serde, starknet::Store)]
pub struct Notification {
    pub notification_id: u256,
    pub caller: ContractAddress,
    pub receiver: ContractAddress,
    pub notification_message: ByteArray,
    pub notification_type: felt252,
    pub notification_status: felt252,
    pub timestamp: u64,
}

#[derive(Drop, Serde, starknet::Store)]
pub struct Message {
    pub sender: ContractAddress,
    pub receiver: ContractAddress,
    pub message: felt252,
    pub timestamp: u64,
    pub group_name: felt252,
    pub media: ByteArray,
}

#[derive(Drop, Serde, starknet::Store)]
pub struct Reel {
    pub reel_id: u256,
    pub caller: ContractAddress,
    pub likes: u256,
    pub dislikes: u256,
    pub comments: u256,
    pub shares: u256,
    pub video: ByteArray,
    pub timestamp: u64,
    pub description: ByteArray,
    pub zuri_points: u256,
}