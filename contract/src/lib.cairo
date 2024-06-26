use starknet::ContractAddress;

#[starknet::interface]
pub trait IStarkZuriContract<TContractState> {
    fn add_user(ref self: TContractState, name: felt252, username: felt252, profile_pic: felt252, cover_photo: felt252);
    fn view_user(self: @TContractState, user_id: ContractAddress) -> User;
    fn view_user_count(self: @TContractState) -> u256;
}

#[derive(Drop, Serde, Copy, starknet::Store)]
pub struct User {
    pub userId: ContractAddress,
    pub name: felt252,
    pub username: felt252,
    pub profile_pic: felt252,
    pub cover_photo: felt252,
    pub date_registered: felt252,
    pub no_of_followers: u8,
    pub number_following: u8,
}


#[derive(Drop, Serde, Copy, starknet::Store)]
pub struct Post {
    #[key]
    postId: u8,
    caller: ContractAddress,
    content: felt252,
    likes: u8,
    comments: u8,
    shares: u8,
    // images and video links will be stored in Legacy Maps for now
}


#[starknet::contract]
pub mod StarkZuri {
    use starknet::{ContractAddress, get_caller_address};
    use super::User;
    use super::Post;
    #[storage]
    struct Storage {
        users_count: u256,
        users: LegacyMap::<ContractAddress, User>,
        posts: LegacyMap::<(ContractAddress, u8), Post>,
        // followers and following profiles
        followers: LegacyMap::<(ContractAddress, felt252), u8>,
        following: LegacyMap::<(ContractAddress, felt252), u8>,
        post_images: LegacyMap::<(ContractAddress, u8), felt252>,
        post_comments: LegacyMap::<(ContractAddress, u8), felt252>,
    }

    // adding user to or better still veryfying you ruser details
    #[abi(embed_v0)]
    impl StarkZuri of super::IStarkZuriContract<ContractState> {
        fn add_user(ref self: ContractState, name: felt252, username: felt252, profile_pic: felt252, cover_photo: felt252) {
            let caller: ContractAddress = get_caller_address();
            let user: User = User {
                userId: caller,
                name: name,
                username: username,
                profile_pic: profile_pic,
                cover_photo: cover_photo,
                date_registered: 'now',
                no_of_followers: 0,
                number_following: 0,
            };
            self.users.write(caller, user);
            self.users_count.write(self.users_count.read() + 1);

            
        }

        fn view_user(self: @ContractState, user_id: ContractAddress) -> User {
            let user = self.users.read(user_id);
            user
        }

        fn view_user_count(self: @ContractState) -> u256 {
            self.users_count.read()
        }
    }

}

