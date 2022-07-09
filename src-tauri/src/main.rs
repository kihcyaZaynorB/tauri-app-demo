#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use crate::command::{
    application::application_state::exit, window::window_state::change_window_state,
};

mod command;

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![change_window_state, exit])
        .run(context)
        .expect("error while running tauri application");
}
