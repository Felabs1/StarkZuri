use starknet::ContractAddress;
use core::array::{Array, ArrayTrait};
use starknet::class_hash::ClassHash;
use contract::structs::{Reel, User, Comment, Post, Community, Notification};

#[starknet::interface]
pub trait IStarkZuriContract<TContractState> {
    fn get_owner(self: @TContractState) -> ContractAddress;
    fn add_user(ref self: TContractState, name: felt252, username: felt252,about: ByteArray, profile_pic: ByteArray, cover_photo: ByteArray);
    fn view_user(self: @TContractState, user_id: ContractAddress) -> User;
    fn view_user_count(self: @TContractState) -> u256;
    fn view_all_users(self: @TContractState) -> Array<User>;
    fn follow_user(ref self: TContractState, user: ContractAddress);
    fn follower_exist(self: @TContractState, user: ContractAddress) -> bool;
    fn view_followers(self: @TContractState, user: ContractAddress) -> Array<User>;
    fn upgrade(ref self: TContractState, impl_hash: ClassHash);
    fn version(self: @TContractState) -> u256;
    fn create_post(ref self: TContractState, content: ByteArray, images: ByteArray);
    fn like_post(ref self: TContractState, post_id: u256);
    fn unlike_post(ref self: TContractState, post_id: u256);
    fn view_likes(self: @TContractState, post_id: u256)->Array<User>;
    fn comment_on_post(ref self: TContractState, post_id: u256, content: ByteArray);
    fn view_comments(self: @TContractState, post_id: u256)->Array<Comment>;
    // fn view_posts(self: @TContractState)->Array<Post>;
    fn view_posts(self: @TContractState, page: u256) -> Array<Post>;
    fn filter_post(self: @TContractState, user: ContractAddress) -> Array<Post>;
    fn view_post(self: @TContractState, post_id: u256) -> Post;
    fn create_community(ref self: TContractState, community_name: felt252, description: ByteArray, profile_image: ByteArray, cover_image: ByteArray);
    fn list_communities(self: @TContractState)-> Array<Community>;
    fn join_community(ref self: TContractState, community_id: u256);
    fn member_exist(self: @TContractState, community_id: u256, userId: ContractAddress) -> bool;
    fn view_community_members(self: @TContractState, community_id: u256) -> Array<User>;
    fn trigger_notification(ref self: TContractState, caller: ContractAddress);
    fn view_notifications(self: @TContractState, account_name: ContractAddress)->Array<Notification>;
    fn create_reel(ref self: TContractState, description: ByteArray, video: ByteArray);
    fn view_reels(self: @TContractState)-> Array<Reel>;
    fn view_reels_for_account(self: @TContractState, owner: ContractAddress)-> Array<Reel>;
    fn like_reel(ref self: TContractState, reel_id: u256);
    fn dislike_reel(ref self: TContractState, reel_id: u256);
    fn comment_on_reel(ref self: TContractState, reel_id: u256, content: ByteArray);
    fn view_reel_comments(self: @TContractState, reel_id: u256) -> Array<Comment>;
    fn repost_reel(ref self: TContractState, reel_id: u256);
    fn claim_reel_points(ref self: TContractState, reel_id: u256);
    fn claim_post_points(ref self: TContractState, post_id: u256);
    fn add_token_address(ref self: TContractState, token_name: felt252, token_address: ContractAddress);
    fn deposit_fee(ref self: TContractState, receiver: ContractAddress);
    fn view_contract_balance(self: @TContractState, address: ContractAddress) -> u256;
    fn get_total_posts(self: @TContractState) -> u256;
    fn withdraw_zuri_points(ref self: TContractState, amount: u256);
}


