use starknet::ContractAddress;

#[starknet::interface]
pub trait IStarkZuriContract<TContractState> {
    fn add_user(ref self: TContractState, name: felt252, username: felt252, profile_pic: felt252, cover_photo: felt252) -> bool;
}

#[derive(Drop, Serde, Copy, starknet::Store)]
pub struct User {
    userId: ContractAddress,
    username: felt252,
    profile_pic: felt252,
    cover_photo: felt252,
    date_registered: felt252,
    no_of_followers: u8,
    number_following: u8,
}


#[starknet::contract]
pub mod StarkZuri {
    use starknet::ContractAddress;
    use super::User;
    #[storage]
    struct Storage {
        users: LegacyMap::<ContractAddress, User>
    }
}
