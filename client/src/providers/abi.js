export const CONTRACT_ADDRESS =
  "0x7c2109cfa8c36fa10c6baac19b234679606cba00eb6697a052b73b869850673";
export const ABI = [
  {
    type: "impl",
    name: "StarkZuri",
    interface_name: "contract::interfaces::IStarkZuriContract",
  },
  {
    type: "struct",
    name: "core::byte_array::ByteArray",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>",
      },
      {
        name: "pending_word",
        type: "core::felt252",
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32",
      },
    ],
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "struct",
    name: "contract::structs::User",
    members: [
      {
        name: "userId",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "name",
        type: "core::felt252",
      },
      {
        name: "username",
        type: "core::felt252",
      },
      {
        name: "about",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "profile_pic",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "cover_photo",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "date_registered",
        type: "core::integer::u64",
      },
      {
        name: "no_of_followers",
        type: "core::integer::u8",
      },
      {
        name: "number_following",
        type: "core::integer::u8",
      },
      {
        name: "notifications",
        type: "core::integer::u256",
      },
      {
        name: "zuri_points",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "contract::structs::Comment",
    members: [
      {
        name: "postId",
        type: "core::integer::u256",
      },
      {
        name: "commentId",
        type: "core::integer::u256",
      },
      {
        name: "caller",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "content",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "likes",
        type: "core::integer::u8",
      },
      {
        name: "replies",
        type: "core::integer::u8",
      },
      {
        name: "time_commented",
        type: "core::integer::u64",
      },
      {
        name: "zuri_points",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "struct",
    name: "contract::structs::Post",
    members: [
      {
        name: "postId",
        type: "core::integer::u256",
      },
      {
        name: "caller",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "content",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "likes",
        type: "core::integer::u8",
      },
      {
        name: "comments",
        type: "core::integer::u256",
      },
      {
        name: "shares",
        type: "core::integer::u8",
      },
      {
        name: "images",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "zuri_points",
        type: "core::integer::u256",
      },
      {
        name: "date_posted",
        type: "core::integer::u64",
      },
    ],
  },
  {
    type: "struct",
    name: "contract::structs::Community",
    members: [
      {
        name: "community_id",
        type: "core::integer::u256",
      },
      {
        name: "community_admin",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "community_name",
        type: "core::felt252",
      },
      {
        name: "description",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "members",
        type: "core::integer::u256",
      },
      {
        name: "online_members",
        type: "core::integer::u256",
      },
      {
        name: "profile_image",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "cover_image",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "zuri_points",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "struct",
    name: "contract::structs::Notification",
    members: [
      {
        name: "notification_id",
        type: "core::integer::u256",
      },
      {
        name: "caller",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "receiver",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "notification_message",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "notification_type",
        type: "core::felt252",
      },
      {
        name: "notification_status",
        type: "core::felt252",
      },
      {
        name: "timestamp",
        type: "core::integer::u64",
      },
    ],
  },
  {
    type: "struct",
    name: "contract::structs::Reel",
    members: [
      {
        name: "reel_id",
        type: "core::integer::u256",
      },
      {
        name: "caller",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "likes",
        type: "core::integer::u256",
      },
      {
        name: "dislikes",
        type: "core::integer::u256",
      },
      {
        name: "comments",
        type: "core::integer::u256",
      },
      {
        name: "shares",
        type: "core::integer::u256",
      },
      {
        name: "video",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "timestamp",
        type: "core::integer::u64",
      },
      {
        name: "description",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "zuri_points",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "interface",
    name: "contract::interfaces::IStarkZuriContract",
    items: [
      {
        type: "function",
        name: "get_owner",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "add_user",
        inputs: [
          {
            name: "name",
            type: "core::felt252",
          },
          {
            name: "username",
            type: "core::felt252",
          },
          {
            name: "about",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "profile_pic",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "cover_photo",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "view_user",
        inputs: [
          {
            name: "user_id",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "contract::structs::User",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "view_user_count",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "view_all_users",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<contract::structs::User>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "follow_user",
        inputs: [
          {
            name: "user",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "follower_exist",
        inputs: [
          {
            name: "user",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "view_followers",
        inputs: [
          {
            name: "user",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<contract::structs::User>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "upgrade",
        inputs: [
          {
            name: "impl_hash",
            type: "core::starknet::class_hash::ClassHash",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "version",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "create_post",
        inputs: [
          {
            name: "content",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "images",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "like_post",
        inputs: [
          {
            name: "post_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "unlike_post",
        inputs: [
          {
            name: "post_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "view_likes",
        inputs: [
          {
            name: "post_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<contract::structs::User>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "comment_on_post",
        inputs: [
          {
            name: "post_id",
            type: "core::integer::u256",
          },
          {
            name: "content",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "view_comments",
        inputs: [
          {
            name: "post_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<contract::structs::Comment>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "view_posts",
        inputs: [
          {
            name: "page",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<contract::structs::Post>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "filter_post",
        inputs: [
          {
            name: "user",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<contract::structs::Post>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "view_post",
        inputs: [
          {
            name: "post_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "contract::structs::Post",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "create_community",
        inputs: [
          {
            name: "community_name",
            type: "core::felt252",
          },
          {
            name: "description",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "profile_image",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "cover_image",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "list_communities",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<contract::structs::Community>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "join_community",
        inputs: [
          {
            name: "community_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "member_exist",
        inputs: [
          {
            name: "community_id",
            type: "core::integer::u256",
          },
          {
            name: "userId",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "view_community_members",
        inputs: [
          {
            name: "community_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<contract::structs::User>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "trigger_notification",
        inputs: [
          {
            name: "caller",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "view_notifications",
        inputs: [
          {
            name: "account_name",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<contract::structs::Notification>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "create_reel",
        inputs: [
          {
            name: "description",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "video",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "view_reels",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<contract::structs::Reel>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "view_reels_for_account",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<contract::structs::Reel>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "like_reel",
        inputs: [
          {
            name: "reel_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "dislike_reel",
        inputs: [
          {
            name: "reel_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "comment_on_reel",
        inputs: [
          {
            name: "reel_id",
            type: "core::integer::u256",
          },
          {
            name: "content",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "view_reel_comments",
        inputs: [
          {
            name: "reel_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<contract::structs::Comment>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "repost_reel",
        inputs: [
          {
            name: "reel_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "claim_reel_points",
        inputs: [
          {
            name: "reel_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "claim_post_points",
        inputs: [
          {
            name: "post_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "add_token_address",
        inputs: [
          {
            name: "token_name",
            type: "core::felt252",
          },
          {
            name: "token_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "deposit_fee",
        inputs: [
          {
            name: "receiver",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "view_contract_balance",
        inputs: [
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_total_posts",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "withdraw_zuri_points",
        inputs: [
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "OwnableImpl",
    interface_name: "openzeppelin::access::ownable::interface::IOwnable",
  },
  {
    type: "interface",
    name: "openzeppelin::access::ownable::interface::IOwnable",
    items: [
      {
        type: "function",
        name: "owner",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "transfer_ownership",
        inputs: [
          {
            name: "new_owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "renounce_ownership",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "address",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "contract::starkzuri::StarkZuri::Upgraded",
    kind: "struct",
    members: [
      {
        name: "implementation",
        type: "core::starknet::class_hash::ClassHash",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    kind: "struct",
    members: [
      {
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    kind: "struct",
    members: [
      {
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin::access::ownable::ownable::OwnableComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "OwnershipTransferred",
        type: "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferred",
        kind: "nested",
      },
      {
        name: "OwnershipTransferStarted",
        type: "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
        kind: "nested",
      },
    ],
  },
  {
    type: "event",
    name: "contract::starkzuri::StarkZuri::Event",
    kind: "enum",
    variants: [
      {
        name: "Upgraded",
        type: "contract::starkzuri::StarkZuri::Upgraded",
        kind: "nested",
      },
      {
        name: "OwnableEvent",
        type: "openzeppelin::access::ownable::ownable::OwnableComponent::Event",
        kind: "flat",
      },
    ],
  },
];
