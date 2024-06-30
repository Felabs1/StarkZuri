export const CONTRACT_ADDRESS =
  "0x40b142cf10924b848179947367fb1aef325cc43d4b38d8347185a6fd4e0790e";
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
