export const CONTRACT_ADDRESS =
  "0x6fa4fd5e80533c13c22811ce231ed550cd40f4406cdb87e32bc987d6faf5196";
export const ABI = [
  {
    type: "impl",
    name: "StarkZuri",
    interface_name: "contract::IStarkZuriContract",
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
    name: "contract::User",
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
        type: "core::felt252",
      },
      {
        name: "no_of_followers",
        type: "core::integer::u8",
      },
      {
        name: "number_following",
        type: "core::integer::u8",
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
    name: "contract::Comment",
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
    ],
  },
  {
    type: "struct",
    name: "contract::Post",
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
    ],
  },
  {
    type: "interface",
    name: "contract::IStarkZuriContract",
    items: [
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
            type: "contract::User",
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
            type: "core::array::Array::<contract::User>",
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
            type: "core::array::Array::<contract::User>",
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
            type: "core::array::Array::<contract::User>",
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
            type: "core::array::Array::<contract::Comment>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "view_posts",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<contract::Post>",
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
            type: "core::array::Array::<contract::Post>",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [],
  },
  {
    type: "event",
    name: "contract::StarkZuri::Upgraded",
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
    name: "contract::StarkZuri::Event",
    kind: "enum",
    variants: [
      {
        name: "Upgraded",
        type: "contract::StarkZuri::Upgraded",
        kind: "nested",
      },
    ],
  },
];
