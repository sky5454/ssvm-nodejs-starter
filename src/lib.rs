extern crate crypto;

use wasm_bindgen::prelude::*;
use crypto::digest::Digest;
use crypto::md5::Md5;
use crypto::sha1::Sha1;
use crypto::sha2::Sha256;
use crypto::sha2::Sha512;


#[wasm_bindgen]
pub fn say(s: &str) -> String {
  println!("The Rust function say() received {}", s);
  let r = String::from("hello ");
  return r + s;
}


#[wasm_bindgen]
pub fn md5(s: &str) -> String {
  let mut hasher = Md5::new();
  hasher.input_str(s);
  return hasher.result_str();
}


#[wasm_bindgen]
pub fn sha1(s: &str) -> String {
  let mut hasher = Sha1::new();
  hasher.input_str(s);
  return hasher.result_str();
}


#[wasm_bindgen]
pub fn sha256(s: &str) -> String {
  let mut hasher = Sha256::new();
  hasher.input_str(s);
  return hasher.result_str();
}



#[wasm_bindgen]
pub fn sha512(s: &str) -> String {
  let mut hasher = Sha512::new();
  hasher.input_str(s);
  return hasher.result_str();
}





