use starknet::ContractAddress;
use core::array::{Array, ArrayTrait};
use starknet::class_hash::ClassHash;

#[starknet::interface]
pub trait IStarkZuriContract<TContractState> {
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
    fn view_posts(self: @TContractState)->Array<Post>;
    fn filter_post(self: @TContractState, user: ContractAddress) -> Array<Post>;
    fn view_post(self: @TContractState, post_id: u256) -> Post;
    fn create_community(ref self: TContractState, community_name: felt252, description: ByteArray, profile_image: ByteArray, cover_image: ByteArray);
    fn list_communities(self: @TContractState)-> Array<Community>;
    fn join_community(ref self: TContractState, community_id: u256);
    fn member_exist(self: @TContractState, community_id: u256, userId: ContractAddress) -> bool;
    fn view_community_members(self: @TContractState, community_id: u256) -> Array<User>;
    fn trigger_notification(ref self: TContractState, caller: ContractAddress);
    fn view_notifications(self: @TContractState, account_name: ContractAddress)->Array<Notification>;
    
}



#[derive(Drop, Serde, starknet::Store)]
pub struct User {
    pub userId: ContractAddress,
    pub name: felt252,
    pub username: felt252,
    pub about: ByteArray,
    pub profile_pic: ByteArray,
    pub cover_photo: ByteArray,
    pub date_registered: felt252,
    pub no_of_followers: u8,
    pub number_following: u8,
    pub notifications: u256,
}


#[derive(Drop, Serde, starknet::Store)]
pub struct Post {
    #[key]
    postId: u256,
    caller: ContractAddress,
    content: ByteArray,
    likes: u8,
    comments: u256,
    shares: u8,
    images: ByteArray,
    // images and video links will be stored in Legacy Maps for now
}

#[derive(Drop, Serde, starknet::Store)]
struct Comment {
    postId: u256,
    commentId: u256,
    caller: ContractAddress,
    content: ByteArray,
    likes: u8,
    replies: u8,
}

#[derive(Drop, Serde, starknet::Store)]
struct Community {
    community_id: u256,
    community_admin: ContractAddress,
    community_name: felt252,
    description: ByteArray,
    members: u256,
    online_members: u256,
    profile_image: ByteArray,
    cover_image: ByteArray,
}

#[derive(Drop, Serde, starknet::Store)]
struct Notification {
    notification_id: u256,
    caller: ContractAddress,
    receiver: ContractAddress,
    notification_message: ByteArray,
    notification_type: felt252,
    notification_status: felt252,
    timestamp: u64,
}

#[derive(Drop, Serde, starknet::Store)]
struct Message {
    sender: ContractAddress,
    receiver: ContractAddress,
    message: felt252,
    timestamp: u64,
    group_name: felt252,
    media: ByteArray,
}

#[derive(Drop, Serde, starknet::Store)]
struct Reel {
    caller: ContractAddress,
    likes: u256,
    dislikes: u256,
    shares: u256,
    video: ByteArray,
    timestamp: u64,
    description: ByteArray,
}


#[starknet::contract]
pub mod StarkZuri {
    // importing dependancies into the starknet contract;
    use core::array::ArrayTrait;
    use contract::IStarkZuriContract;
    use core::traits::Into;
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use starknet::class_hash::ClassHash;
    use starknet::SyscallResultTrait;
    use core::num::traits::Zero;
    use super::{User, Post, Comment, Community, Notification};
    #[storage]
    struct Storage {
        deployer: ContractAddress,
        version: u256,
        users_count: u256,
        posts_count: u256,
        users: LegacyMap::<ContractAddress, User>,
        posts: LegacyMap::<u256, Post>,
        user_addresses: LegacyMap::<u256, ContractAddress>,
        // followers and following profiles
        followers: LegacyMap::<(ContractAddress, u8), ContractAddress>,
        post_comments: LegacyMap::<(u256, u256), Comment>,
        post_likes: LegacyMap::<(ContractAddress, u256), felt252>,
        comment_count: u256,

        // communities
        community_count: u256,
        communities: LegacyMap::<u256, Community>,

        // community_joins
        // a user can join more than one community
        community_members: LegacyMap::<(u256, u256), User>,

        // we are supposed to store notification based on the caller address
        notifications: LegacyMap::<(ContractAddress, u256), Notification>

    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        let deployer = get_caller_address();
        self.deployer.write(deployer);
    }

    #[event]
    #[derive(Copy, Drop, Debug, PartialEq, starknet::Event)]
    pub enum Event {
        Upgraded: Upgraded
    }

    #[derive(Copy, Drop, Debug, PartialEq, starknet::Event)]
    pub struct Upgraded {
        pub implementation: ClassHash
    }

    // adding user to or better still veryfying you ruser details
    #[abi(embed_v0)]
    impl StarkZuri of super::IStarkZuriContract<ContractState> {
        fn add_user(ref self: ContractState, name: felt252, username: felt252,about: ByteArray, profile_pic: ByteArray, cover_photo: ByteArray) {
            let caller: ContractAddress = get_caller_address();
            let user: User = User {
                userId: caller,
                name: name,
                username: username,
                profile_pic: profile_pic,
                cover_photo: cover_photo,
                about: about,
                date_registered: 'now',
                no_of_followers: 0,
                number_following: 0,
                notifications: 0,
            };
            let available_user = self.view_user(caller);
            if(available_user.userId != caller) {
                let assigned_user_number: u256 = self.users_count.read() + 1;

                self.users.write(caller, user);
                self.users_count.write(assigned_user_number);
                self.user_addresses.write(assigned_user_number, caller);
            }
            
        }

        fn view_user(self: @ContractState, user_id: ContractAddress) -> User {
            let user = self.users.read(user_id);
            user
        }

        fn view_user_count(self: @ContractState) -> u256 {
            self.users_count.read()
        }

        fn view_all_users(self: @ContractState)->Array<User> {
            let mut users: Array = ArrayTrait::new();
            let mut counter: u256 = 1;
            let user_length = self.users_count.read();
            while(counter <= user_length){
                let user_address: ContractAddress = self.user_addresses.read(counter);
                let single_user: User = self.users.read(user_address);
                users.append(single_user);
                counter += 1;
            };

            users
        }

        fn follow_user(ref self: ContractState, user: ContractAddress){
            let mut user_following: ContractAddress = get_caller_address();
            // the person doing the following
            let mut _user: User = self.users.read(user_following);
            
            
            // let us check if the caller allready followed the user so we dont have to update again
            // let available_follower = self.followers.read((user, ))
            // this is the person being followed
            let mut user_to_be_followed: User = self.users.read(user);
            let mut _user_to_be_followed: User = self.users.read(user);
            if self.follower_exist(user) == false {
                user_to_be_followed.no_of_followers += 1;
                _user_to_be_followed.no_of_followers += 1;
                user_to_be_followed.notifications += 1;
                _user_to_be_followed.notifications += 1;
                _user.number_following += 1;
                let message = format!("{} followed you", _user.name);

                // we are going to create notification data store
                let notification = Notification {
                    notification_id: user_to_be_followed.notifications,
                    caller: get_caller_address(),
                    receiver: user,
                    notification_message: message,
                    notification_type: 'follow!',
                    notification_status: 'unread',
                    timestamp: get_block_timestamp()
                };

                self.users.write(user_following, _user);
                self.users.write(user, _user_to_be_followed);

                self.followers.write(
                    (user, user_to_be_followed.no_of_followers), 
                 user_following);
                 self.notifications.write((user, user_to_be_followed.notifications), notification);
            }
            
        }

        fn follower_exist(self: @ContractState, user: ContractAddress) -> bool {
            let mut user_to_be_followed: User = self.users.read(user);
            let no_of_follwers = user_to_be_followed.no_of_followers;
            let mut counter = 1;
            let mut follower_exist = false;
            while(counter <= no_of_follwers){
                let follower = self.followers.read((user, counter));
                if(follower == get_caller_address()) {
                    follower_exist = true;
                    break;
                }
                counter+=1;
            };
            follower_exist
        }

        fn view_followers(self: @ContractState, user: ContractAddress) -> Array<User>{
            let mut followers: Array = ArrayTrait::new();
            let mut counter: u8 = 1;
            let user_followed:User = self.users.read(user);
            let no_of_followers = user_followed.no_of_followers;

            while (counter <= no_of_followers) {
                let _follower_address: ContractAddress = self.followers.read((user, counter));
                let _follower: User = self.users.read(_follower_address);
                followers.append(_follower);
                counter += 1;
            };

            followers
        }

        fn upgrade(ref self: ContractState, impl_hash: ClassHash) {
            let upgrader = get_caller_address();
            assert(impl_hash.is_non_zero(), 'class hash cannot be zero');
            assert(self.deployer.read() == upgrader, 'only felix can upgrade');
            starknet::syscalls::replace_class_syscall(impl_hash).unwrap_syscall();
            self.emit(Event::Upgraded(Upgraded {implementation: impl_hash}));
            self.version.write(self.version.read() + 1);
        }

        fn version(self: @ContractState) -> u256 {
            self.version.read()
        }

        fn create_post(ref self: ContractState, content: ByteArray, images: ByteArray) {
            let _post_id = self.posts_count.read() + 1;
            let post = Post {
                postId: _post_id,
                caller: get_caller_address(),
                content: content,
                likes: 0,
                comments: 0,
                shares: 0,
                images: images,

            };
            self.posts_count.write(_post_id);
            self.posts.write(_post_id, post);
            self.trigger_notification(get_caller_address());
        }


        fn like_post(ref self: ContractState, post_id: u256){
            // we need to prevent liking twice
            let mut likable_post = self.post_likes.read((get_caller_address(), post_id));
            if (likable_post != 'like') {
                let mut post = self.posts.read(post_id);
                post.likes += 1;
                
                let liker: User = self.users.read(get_caller_address());
                let mut user: User = self.users.read(post.caller);
                let notification_count: u256 = user.notifications + 1;
                let notification = Notification {
                    notification_id: notification_count,
                    caller: get_caller_address(),
                    receiver: post.caller,
                    notification_message: format!("{} liked your post", liker.name),
                    notification_type: 'like',
                    notification_status: 'unread',
                    timestamp: get_block_timestamp(),
                };
                user.notifications = notification_count;
                self.notifications.write((post.caller, notification_count), notification);
                self.users.write(post.caller, user);
                self.posts.write(post_id, post);
                self.post_likes.write((get_caller_address(), post_id), 'like');
            }
    
        }
    
        fn unlike_post(ref self: ContractState, post_id: u256) {
            let mut likable_post = self.post_likes.read((get_caller_address(), post_id));
            if (likable_post == 'like') {
                let mut post = self.posts.read(post_id);
                post.likes -= 1;
                self.posts.write(post_id, post);
                self.post_likes.write((get_caller_address(), post_id), '');
            }
        }

        // fn view_likes()
        fn view_likes(self: @ContractState, post_id: u256) -> Array<User> {
            let mut users: Array<User> = ArrayTrait::new();

            let all_users: Array<User> = self.view_all_users();
            let mut counter = 0;

            while (counter < all_users.len()) {
                let _post = self.posts.read(post_id);
                let _user = all_users.at(counter);
                let _user_address = *_user.userId;  // we have the user address
                // we also have the post id
                let reaction = self.post_likes.read((_user_address, post_id));
                if reaction == 'like' {
                    let user = self.users.read(_user_address);
                    users.append(user);

                }
                counter += 1;
                
            };

            users
        }


        fn comment_on_post(ref self: ContractState, post_id: u256, content: ByteArray){
            let comment_id = self.comment_count.read() + 1;
            
            let comment = Comment {
                postId: post_id,
                commentId: comment_id,
                caller: get_caller_address(),
                content: content,
                likes: 0,
                replies: 0,
            };
            let mut post = self.posts.read(post_id);
            let mut _post = self.posts.read(post_id);
            _post.comments += 1;
            post.comments += 1;
            self.posts.write(post_id, _post);

            self.post_comments.write((post_id, post.comments), comment);
        }

        fn view_comments(self: @ContractState, post_id: u256) -> Array<Comment> {
            let mut comments: Array<Comment> = ArrayTrait::new();
            let post = self.posts.read(post_id);
            let _comment_count = post.comments;
            let mut counter = 1;
            while (counter <= _comment_count){
                let comment = self.post_comments.read((post_id, counter));
                comments.append(comment);
                counter +=  1;
            };

            comments
        }

        fn view_posts(self: @ContractState)->Array<Post> {
            let post_count: u256 = self.posts_count.read();
            let mut counter: u256 = 1;
            let mut posts = ArrayTrait::new();

            while (counter <= post_count) {
                let post:  Post = self.posts.read(counter);
                posts.append(post);
                counter += 1;

            };

            posts

        }

        fn filter_post(self: @ContractState, user: ContractAddress) -> Array<Post> {
            // let mut posts: @Array<Post> = @self.view_posts();
            // let mut filtered_posts: @Array<Post> = @ArrayTrait::new();
            // let mut counter = 0;
            // while (counter < posts.len()) {
            //     let post: Post = *posts.at(counter);
            //     if post.caller == user {
                    
            //     }
            //     counter += 1;
            // };
            // filtered_posts
            let post_count = self.posts_count.read();
            let mut counter = 1;
            let mut posts = ArrayTrait::new();

            while (counter <= post_count) {
                let post:  Post = self.posts.read(counter);
                if post.caller == user {
                    posts.append(post);
                }
                counter += 1;

            };

            posts


        }

        fn view_post(self: @ContractState, post_id: u256) -> Post {
            self.posts.read(post_id)
        }


        // let's create our community
        fn create_community(ref self: ContractState, community_name: felt252, description: ByteArray, profile_image: ByteArray, cover_image: ByteArray){
            let community_id = self.community_count.read() + 1;
            let community = Community {
                community_id: community_id,
                community_admin: get_caller_address(),
                community_name: community_name,
                description: description,
                members: 1,
                online_members: 0,
                profile_image: profile_image,
                cover_image: cover_image
            };
            let user: User = self.users.read(get_caller_address());
            self.communities.write(community_id, community);
            self.community_count.write(community_id);
            self.community_members.write((1, community_id), user);
        }

        fn list_communities(self: @ContractState) -> Array<Community> {
            let mut listed_communities: Array<Community> =  ArrayTrait::new();
            let mut  counter: u256 = 1;
            let community_count: u256 = self.community_count.read();

            while(counter <= community_count){
                let community = self.communities.read(counter);
                listed_communities.append(community);
                counter += 1;
            };

            

            listed_communities

        }

        fn join_community(ref self: ContractState, community_id: u256){
            let mut user_joining: ContractAddress = get_caller_address();
            let mut _user: User = self.users.read(user_joining);
            let mut community_to_be_joined: Community = self.communities.read(community_id);

            if self.member_exist(community_id, user_joining) == false {
                let mut _members = community_to_be_joined.members + 1;
                community_to_be_joined.members = _members;
                self.community_members.write((_members, community_id), _user);
                self.communities.write(community_id, community_to_be_joined);
            }

            

        }

        fn member_exist(self: @ContractState, community_id: u256, userId: ContractAddress) -> bool{
            let mut member_exist = false;
            let community = self.communities.read(community_id);
            let members = community.members;
            let mut counter: u256 = 1;

            while(counter <= members) {
                let user: User = self.community_members.read((counter, community_id));
                if user.userId == userId {
                    member_exist = true;
                }
                counter += 1;

            };

            return member_exist;
        }

        fn view_community_members(self: @ContractState, community_id: u256) -> Array<User> {
            let mut users: Array<User> = ArrayTrait::new();
            let community: Community = self.communities.read(community_id);
            let members = community.members;
            let mut counter: u256 = 1;

            while(counter<= members) {
                let user: User = self.community_members.read((counter, community_id));
                users.append(user);
                counter += 1;
            };

            users


        }

        fn trigger_notification(ref self: ContractState, caller: ContractAddress){
            // we check if the receiver is actually being followed by the caller
            let followers: Array<User> = self.view_followers(caller);
            let user: User = self.view_user(caller);
            let mut counter = 1;

            while (counter < followers.len()){
                let mut _follower = followers.at(counter);
                let message = format!("{} made a post check his threads here", user.name);
                let notification_id: u256 = *_follower.notifications + 1;
                let notification = Notification {
                    notification_id: notification_id,
                    caller: caller,
                    receiver: *_follower.userId,
                    notification_message: message,
                    notification_type: 'post',
                    notification_status: 'unread',
                    timestamp: get_block_timestamp(),

                };

                let mut user = self.users.read(*_follower.userId);
                user.notifications = notification_id;

                // _follower.notifications = notification_id;
                self.users.write(*_follower.userId, user);
                
                self.notifications.write((*_follower.userId, notification_id), notification);
                counter += 1;
            };

                    
        }

        fn view_notifications(self: @ContractState, account_name: ContractAddress)->Array<Notification>{
            let mut notifications: Array<Notification> = ArrayTrait::new();
            let user: User = self.view_user(account_name);
            let mut counter: u256 = 1;
            let _notifications: u256 = user.notifications;

            while (counter <= _notifications) {
                let notification: Notification = self.notifications.read((account_name, counter));
                notifications.append(notification);
                counter += 1;
            };

            return notifications;

        }

        


        
    }
}

