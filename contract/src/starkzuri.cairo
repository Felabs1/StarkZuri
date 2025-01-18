
#[starknet::contract]
pub mod StarkZuri {

    
    // importing dependancies into the starknet contract;
    // use super::IStarkZuriContract;
    use core::option::OptionTrait;
    use core::traits::TryInto;
    use core::array::ArrayTrait;
    use contract::interfaces::IStarkZuriContract;
    use core::traits::Into;
    use starknet::{ContractAddress, get_caller_address,get_contract_address, get_block_timestamp, contract_address_const, syscalls};
    use starknet::class_hash::ClassHash;
    use starknet::SyscallResultTrait;
    use contract::structs::{User, Post, Comment, Community, Notification, Reel, PostView, LightUser};
    use contract::erc20::{IERC20DispatcherTrait, IERC20Dispatcher};
    // use openzeppelin::token::erc20::interface::{ERC20ABIDispatcher, ERC20ABIDispatcherTrait};
    // use openzeppelin::access::ownable::OwnableComponent;
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};

    // component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    // #[abi(embed_v0)]
    // impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    // impl InternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
       
        deployer: ContractAddress,
        version: u256,
        users_count: u256,
        posts_count: u256,
        users: Map::<ContractAddress, User>,
        posts: Map::<u256, Post>,
        user_addresses: Map::<u256, ContractAddress>,
        // followers and following profiles
        followers: Map::<(ContractAddress, u8), ContractAddress>,
        post_comments: Map::<(u256, u256), Comment>,
        post_likes: Map::<(ContractAddress, u256), felt252>,
        comment_count: u256,

        // communities
        community_count: u256,
        communities: Map::<u256, Community>,

        // community_joins
        // a user can join more than one community
        community_members: Map::<(u256, u256), User>,

        // we are supposed to store notification based on the caller address
        notifications: Map::<(ContractAddress, u256), Notification>,

        // time to create a reel
        reel_count: u256,
        reels: Map::<u256, Reel>,
        reel_likes: Map::<(ContractAddress, u256), felt252>,
        reel_dislikes: Map::<(ContractAddress, u256), felt252>,
        reel_comments: Map::<(u256, u256), Comment>,

        // now we need to claim the points so that they can appear on the profile
        claimed_points: Map::<ContractAddress, u256>,

        // we are going to create a 
        token_addresses: Map::<felt252, ContractAddress>,
        balances: Map::<ContractAddress, u256>,
        // #[substorage(v0)]
        // pub ownable: OwnableComponent::Storage,
        

    }



    #[constructor]
    fn constructor(ref self: ContractState, address: ContractAddress) {
        let deployer: ContractAddress = address;
        self.deployer.write(deployer);
        // self.ownable.initializer(deployer);

    }

   


    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        Upgraded: Upgraded,
        // #[flat]
        // OwnableEvent: OwnableComponent::Event
    }

    #[derive(Copy, Drop, Debug, PartialEq, starknet::Event)]
    pub struct Upgraded {
        pub implementation: ClassHash
    }

    // adding user to or better still veryfying you ruser details
    #[abi(embed_v0)]
    impl StarkZuri of IStarkZuriContract<ContractState> {
        fn add_token_address(ref self: ContractState, token_name: felt252, token_address: ContractAddress) {
            assert(self.deployer.read() == get_caller_address(), 'only felix can make this call');
            self.token_addresses.write(token_name, token_address);
        }

        fn view_contract_balance(self: @ContractState, address: ContractAddress) -> u256{
            
            self.balances.read(address)
        }

        fn get_total_posts(self: @ContractState) -> u256 {
            self.posts_count.read()
        }

        fn withdraw_zuri_points(ref self: ContractState, amount: u256){
            let caller = get_caller_address();
            let total_amount = amount * 3100000000000;
            let token_dispatcher = IERC20Dispatcher { contract_address: contract_address_const::<
                0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
            >()};
            let balance = self.balances.read(contract_address_const::<0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7>());
            assert(balance > total_amount, 'not enough eth in the vault');
            let mut user = self.users.read(caller);
            assert(user.zuri_points >= amount, 'insufficient points');
            user.zuri_points = user.zuri_points - amount;
            let has_transferred = token_dispatcher.transfer(recipient: get_caller_address(), amount: total_amount);
            if has_transferred {
                self.balances.write(contract_address_const::<
                    0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                >(), self.balances.read(contract_address_const::<
                    0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                >()) - total_amount);
                self.users.write(caller, user);
            }

        }

        
        fn add_user(ref self: ContractState, name: felt252, username: felt252,about: ByteArray, profile_pic: ByteArray, cover_photo: ByteArray) {
            let caller: ContractAddress = get_caller_address();
            let user: User = User {
                userId: caller,
                name: name,
                username: username,
                profile_pic: profile_pic,
                cover_photo: cover_photo,
                about: about,
                date_registered: get_block_timestamp(),
                no_of_followers: 0,
                number_following: 0,
                notifications: 0,
                zuri_points: 0,
            };
            let available_user = self.view_user(caller);
            if(available_user.userId != caller) {
                let assigned_user_number: u256 = self.users_count.read() + 1;
                let notification = Notification {
                    notification_id: 1,
                    caller: get_caller_address(),
                    receiver: get_caller_address(),
                    notification_message: "you have been awarded 20 Zuri points for registering to stark zuri",
                    notification_type: 'Join Award',
                    notification_status: 'unread',
                    timestamp: get_block_timestamp()
                };

                // let eth_address: ContractAddress = self.token_addresses.read('ETH');
                // let token_dispatcher = IERC20Dispatcher {contract_address:eth_address};
                // let amount = 100000000000000;
                // let has_transferred = token_dispatcher.transferFrom(sender: caller, recipient: get_contract_address(), amount: amount);
                
                

                
                    // self.balances.write(eth_address, self.balances.read(eth_address) + amount);
                    self.users.write(caller, user);
                    self.users_count.write(assigned_user_number);
                    self.user_addresses.write(assigned_user_number, caller);
                    self.notifications.write((caller, 1), notification);

            } 
            
        }

        fn deposit_fee(ref self: ContractState, receiver: ContractAddress){
            let eth_dispatcher = IERC20Dispatcher {
                contract_address: contract_address_const::<
                    0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                >() // ETH Contract Address            
            };

            eth_dispatcher.approve(get_caller_address(), 1000000000000000);
             
            eth_dispatcher.transferFrom(get_caller_address(), receiver, 1000000000000000);

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
            // assert(impl_hash.is_non_zero(), 'class hash cannot be zero');
            assert(self.deployer.read() == upgrader, 'only felix can upgrade');
            starknet::syscalls::replace_class_syscall(impl_hash).unwrap_syscall();
            self.emit(Event::Upgraded(Upgraded {implementation: impl_hash}));
            self.version.write(self.version.read() + 1);
        }

        fn get_owner(self: @ContractState) -> ContractAddress {
            self.deployer.read()
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
                zuri_points: 0,
                date_posted: get_block_timestamp()

            };
            self.posts_count.write(_post_id);
            self.posts.write(_post_id, post);
            self.trigger_notification(get_caller_address());
        }


        fn like_post(ref self: ContractState, post_id: u256){
            // we need to prevent liking twice
            let mut likable_post = self.post_likes.read((get_caller_address(), post_id));

            let eth_address: ContractAddress = self.token_addresses.read('ETH');
                let token_dispatcher = IERC20Dispatcher {contract_address: contract_address_const::<
                    0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                >()};
                let amount = 31000000000000;
                let has_transferred = token_dispatcher.transferFrom(get_caller_address(), get_contract_address(), amount);

                

            if (likable_post != 'like' && has_transferred) {
                let mut post = self.posts.read(post_id);
                post.likes += 1;
                post.zuri_points += 10;
                
                let liker: User = self.users.read(get_caller_address());
                let mut user: User = self.users.read(post.caller);
                let notification_count: u256 = user.notifications + 1;
                let notification = Notification {
                    notification_id: notification_count,
                    caller: get_caller_address(),
                    receiver: post.caller,
                    notification_message: format!("{} liked your post and won you 10 Zuri points", liker.name),
                    notification_type: 'like',
                    notification_status: 'unread',
                    timestamp: get_block_timestamp(),
                };
                user.notifications = notification_count;
                // user.zuri_points = user.zuri_points + 10;
                self.notifications.write((post.caller, notification_count), notification);
                self.users.write(post.caller, user);
                self.posts.write(post_id, post);
                self.post_likes.write((get_caller_address(), post_id), 'like');
                self.balances.write(contract_address_const::< 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                    >(), self.balances.read(contract_address_const::< 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                        >()) + amount);
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
                time_commented: get_block_timestamp(),
                zuri_points: 0,
            };
            let mut post = self.posts.read(post_id);
            let mut _post = self.posts.read(post_id);
            _post.comments += 1;
            post.comments += 1;
            _post.zuri_points += 2;
            post.zuri_points += 2;
            let user_commenting = self.users.read(get_caller_address());
            let mut receiving_user = self.users.read(post.caller);
            let mut _receiving_user = self.users.read(post.caller);
            let notification_id: u256 = receiving_user.notifications + 1;
            

            
            let token_dispatcher = IERC20Dispatcher {contract_address: contract_address_const::<
                0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
            >()};

            let amount = 5900000000000;
            let has_transferred = token_dispatcher.transferFrom(get_caller_address(), get_contract_address(), amount);
            
            let notification: Notification  =  Notification{
                notification_id: notification_id,
                caller: get_caller_address(),
                receiver: post.caller,
                notification_message: format!("{} commented on your post and that earned your post 2 zuri points", user_commenting.name),
                notification_type: 'comment',
                notification_status: 'unread',
                timestamp: get_block_timestamp(),
            };

            if (has_transferred) {
                self.posts.write(post_id, _post);
                receiving_user.notifications = notification_id;
                _receiving_user.notifications = notification_id;
                self.users.write(post.caller, _receiving_user);
                self.notifications.write((post.caller, notification_id), notification);
                
                //  update notifications storage and users storage
                

                self.post_comments.write((post_id, post.comments), comment);
                self.balances.write(contract_address_const::< 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                    >(), self.balances.read(contract_address_const::< 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                        >()) + amount);

            }
            
            
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

        // fn view_posts(self: @ContractState, page: u32)->Array<Post> {
        //     let post_count: u256 = self.posts_count.read();
        //     let mut counter: u256 = 1;
        //     let mut posts = ArrayTrait::new();
        //     let posts_per_page = 25_u32;

        //     while (counter <= post_count) {
        //         let post:  Post = self.posts.read(counter);
        //         posts.append(post);
        //         counter += 1;

        //     };

        //     posts

        // }

        fn view_posts(self: @ContractState, page: u256) -> Array<PostView> {
            let post_count: u256 = self.posts_count.read();
            let posts_per_page = 10_u256;
            let start_index = (page - 1) * posts_per_page;
            let end_index = start_index + posts_per_page;
        
            let mut posts = ArrayTrait::new();
            let mut counter: u256 = start_index + 1;
        
            while (counter <= end_index && counter <= post_count) {
                let post: Post = self.posts.read(counter);
                let user = self.users.read(post.caller);
                let post_view: PostView =  PostView {
                    postId: post.postId,
                    author: LightUser{
                        userId: user.userId,
                        name: user.name,
                        username: user.username,
                        profile_pic: user.profile_pic,
                        zuri_points: user.zuri_points
                    },
                    content: post.content,
                    likes: post.likes,
                    comments: post.comments,
                    shares: post.shares,
                    images: post.images,
                    zuri_points: post.zuri_points,
                    date_posted: post.date_posted
                    };
                    posts.append(post_view);
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
                cover_image: cover_image,
                zuri_points: 0,
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
            // let mut community_owner = self.users.read(community_to_be_joined.community_admin)

            let token_dispatcher = IERC20Dispatcher {contract_address: contract_address_const::<
                0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
            >()};
            let amount = 31000000000000;
            let has_transferred = token_dispatcher.transferFrom(get_caller_address(), get_contract_address(), amount);

            if self.member_exist(community_id, user_joining) == false && has_transferred {
                let mut _members = community_to_be_joined.members + 1;
                community_to_be_joined.members = _members;
                self.community_members.write((_members, community_id), _user);
                self.communities.write(community_id, community_to_be_joined);
                self.balances.write(contract_address_const::< 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                    >(), self.balances.read(contract_address_const::< 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                        >()) + amount);
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

                // the quick brown fox jumps over the lazy dogs

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

        fn create_reel(ref self: ContractState, description: ByteArray, video: ByteArray){
            let reel_count: u256 = self.reel_count.read() + 1;
            let reel: Reel = Reel {
                reel_id: reel_count,
                caller: get_caller_address(),
                likes: 0,
                dislikes: 0,
                shares: 0,
                video: video,
                timestamp: get_block_timestamp(),
                description: description,
                comments: 0,
                zuri_points: 0
            };

            self.reel_count.write(reel_count);
            self.reels.write(reel_count, reel);
        }

        fn view_reels(self: @ContractState)->Array<Reel> {
            let mut reels: Array<Reel> = ArrayTrait::new();
            let reel_count = self.reel_count.read();
            let mut counter = 1;


            
            while(counter <= reel_count){
                let reel: Reel = self.reels.read(counter);
                reels.append(reel);
                counter+=1;
            };

            reels
        }

        fn view_reels_for_account(self: @ContractState, owner: ContractAddress)-> Array<Reel>{
            // let reels: Array<Reel> = self.view_reels();
            let reel_count = self.reel_count.read();
            let mut account_reels: Array<Reel> = ArrayTrait::new();
            let mut counter = 1;
            while (counter < reel_count){
                let reel: Reel = self.reels.read(counter);
                if reel.caller == owner {
                    account_reels.append(reel);
                }
                counter+=1;
            };

            account_reels
        }

        // ---to do---
        // like reel
        fn like_reel(ref self: ContractState, reel_id: u256){
            let mut likable_reel = self.reel_likes.read((get_caller_address(), reel_id));
            if (likable_reel != 'like'){
                let mut reel = self.reels.read(reel_id);
                reel.likes += 1;
                reel.zuri_points += 10;
                let liker: User = self.users.read(get_caller_address());
                let mut user: User = self.users.read(reel.caller);
                let mut _user: User = self.users.read(reel.caller);
                let notification_count: u256 = user.notifications + 1;
                let notification: Notification = Notification {
                    notification_id: notification_count,
                    caller: get_caller_address(),
                    receiver: reel.caller,
                    notification_message: format!("{} liked your reel and won you 10 zuri points", liker.name),
                    notification_type: 'like',
                    notification_status: 'unread',
                    timestamp: get_block_timestamp(),
                };

                // reel fee goes here
                let token_dispatcher = IERC20Dispatcher {contract_address: contract_address_const::<
                    0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                >()};
                let amount = 31000000000000;
                let has_transferred = token_dispatcher.transferFrom(get_caller_address(), get_contract_address(), amount);

                if has_transferred {
                
                user.notifications = notification_count;
                _user.notifications = notification_count;
                self.notifications.write((reel.caller, notification_count), notification);
                self.users.write(reel.caller, _user);
                self.reels.write(reel_id, reel);
                self.reel_likes.write((get_caller_address(), reel_id), 'like');
                self.balances.write(contract_address_const::< 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                    >(), self.balances.read(contract_address_const::< 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                        >()) + amount);

                }
            }
        }
        // dislike reel
        fn dislike_reel(ref self: ContractState, reel_id: u256){
            let mut likable_reel = self.reel_dislikes.read((get_caller_address(), reel_id));
            if (likable_reel != 'dislike'){
                let mut reel = self.reels.read(reel_id);
                reel.dislikes += 1;
                reel.zuri_points -= 5;
                let liker: User = self.users.read(get_caller_address());
                let mut user: User = self.users.read(reel.caller);
                let mut _user: User = self.users.read(reel.caller);
                let notification_count: u256 = user.notifications + 1;
                let notification: Notification = Notification {
                    notification_id: notification_count,
                    caller: get_caller_address(),
                    receiver: reel.caller,
                    notification_message: format!("{} disliked your reel and deducted it 5 zuri points", liker.name),
                    notification_type: 'dislike',
                    notification_status: 'unread',
                    timestamp: get_block_timestamp(),
                };
                let token_dispatcher = IERC20Dispatcher {contract_address: contract_address_const::<
                    0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                >()};
                let amount = 14000000000000;
                let has_transferred = token_dispatcher.transferFrom(get_caller_address(), get_contract_address(), amount);

                if has_transferred {

                

                user.notifications = notification_count;
                _user.notifications = notification_count;
                self.notifications.write((reel.caller, notification_count), notification);
                self.users.write(reel.caller, _user);
                self.reels.write(reel_id, reel);
                self.reel_dislikes.write((get_caller_address(), reel_id), 'dislike');
                self.balances.write(contract_address_const::< 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                    >(), self.balances.read(contract_address_const::< 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
                        >()) + amount);

                }
            }
        }
        
        // coment on reel
    fn comment_on_reel(ref self: ContractState, reel_id: u256, content: ByteArray){
        let comment_id = self.comment_count.read() + 1;

        let comment = Comment {
            postId: reel_id,
            commentId: comment_id,
            caller: get_caller_address(),
            content: content,
            likes: 0,
            replies: 0,
            time_commented: get_block_timestamp(),
            zuri_points: 0,
        };

        let mut reel = self.reels.read(reel_id);
        let mut _reel = self.reels.read(reel_id);
        _reel.comments += 1;
        reel.comments += 1;
        _reel.zuri_points += 2;
        reel.zuri_points += 2;
        let user_commenting = self.users.read(get_caller_address());
        let mut receiving_user = self.users.read(reel.caller);
        let mut _receiving_user = self.users.read(reel.caller);

        let notification_id: u256= receiving_user.notifications + 1;

        let notification: Notification = Notification {
            notification_id: notification_id,
            caller: get_caller_address(),
            receiver: reel.caller,
            notification_message: format!("{} commented on your reel and that earned it 2 zuri points", user_commenting.name),
            notification_type: 'comment',
            notification_status: 'unread',
            timestamp: get_block_timestamp(),
        };

         
        let token_dispatcher = IERC20Dispatcher {contract_address: contract_address_const::<
            0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
        >()};

        let amount = 5900000000000;
        let has_transferred = token_dispatcher.transferFrom(get_caller_address(), get_contract_address(), amount);

        if (has_transferred) {

        self.reels.write(reel_id, _reel);
        receiving_user.notifications = notification_id;
        _receiving_user.notifications = notification_id;

        self.users.write(reel.caller, _receiving_user);
        self.notifications.write((reel.caller, notification_id), notification);
        self.reel_comments.write((reel_id, reel.comments), comment);
        }
    }

    fn view_reel_comments(self: @ContractState, reel_id: u256) -> Array<Comment> {
        let mut comments: Array<Comment> = ArrayTrait::new();
        let reel = self.reels.read(reel_id);
        let comments_count = reel.comments;
        let mut counter = 1;

        while (counter <= comments_count) {
            let comment = self.reel_comments.read((reel_id, counter));
            comments.append(comment);
            counter += 1;

        };



        comments
    }

    fn repost_reel(ref self: ContractState, reel_id: u256){
        let mut reel = self.reels.read(reel_id);
        let mut _reel = self.reels.read(reel_id);
        reel.shares += 1;
        reel.zuri_points += 4;
        reel.timestamp = get_block_timestamp();
        _reel.shares += 1;
        _reel.zuri_points += 4;
        _reel.timestamp = get_block_timestamp();
        let mut receiving_user: User = self.users.read(reel.caller);
        let mut _receiving_user: User = self.users.read(reel.caller);
        let user_reposting: User = self.users.read(get_caller_address());
        let notification_id = receiving_user.notifications + 1;
        let notification: Notification = Notification {
            notification_id: notification_id,
            caller: get_caller_address(),
            receiver: reel.caller,
            notification_message: format!("{} reposted your reel and earned it 4 zuri points", user_reposting.name),
            notification_type: 'repost',
            notification_status: 'unread',
            timestamp: get_block_timestamp(),
             
        };

        let token_dispatcher = IERC20Dispatcher {contract_address: contract_address_const::<
            0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
        >()};
        let amount = 31000000000000;
        let has_transferred = token_dispatcher.transferFrom(get_caller_address(), get_contract_address(), amount);

        if (has_transferred) {
            self.reels.write(reel_id, _reel);
            receiving_user.notifications = notification_id;
            _receiving_user.notifications = notification_id;
            self.users.write(reel.caller, _receiving_user);
            self.notifications.write((reel.caller, notification_id), notification);
        }
    }

    fn claim_reel_points(ref self: ContractState, reel_id: u256){
        let mut claimer = self.users.read(get_caller_address());
        let mut reel = self.reels.read(reel_id);
        let mut _reel = self.reels.read(reel_id);

        assert(get_caller_address() == reel.caller, 'only reel owner');
        assert(reel.zuri_points > 0, 'no enough zuri');

        claimer.zuri_points += reel.zuri_points;
        reel.zuri_points -= reel.zuri_points;
        _reel.zuri_points -= _reel.zuri_points;
        self.reels.write(reel_id, _reel);
        self.users.write(get_caller_address(), claimer);
        let claimed_points = self.claimed_points.read(get_caller_address());
        self.claimed_points.write(get_caller_address(),claimed_points + reel.zuri_points);

            
        
       
    }

    fn claim_post_points(ref self: ContractState, post_id: u256){
        let mut claimer = self.users.read(get_caller_address());
        let mut post = self.posts.read(post_id);
        let mut _post = self.posts.read(post_id);
       
        assert(post.caller == get_caller_address(), 'only post owner');
        assert(post.zuri_points > 0, 'no enough zuri');
        
        claimer.zuri_points += post.zuri_points;
        post.zuri_points = 0;
        _post.zuri_points = 0;
        self.posts.write(post_id, _post);
        self.users.write(get_caller_address(), claimer);
        let claimed_points = self.claimed_points.read(get_caller_address());
        self.claimed_points.write(get_caller_address(), claimed_points + post.zuri_points);
    }
    

        // repost reel
        
    }
}

