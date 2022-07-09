use serde::{Deserialize, Serialize};
use tauri::{LogicalSize, Runtime};

#[tauri::command]
pub async fn change_window_state<'a, R: Runtime>(
    _app: tauri::AppHandle<R>,
    window: tauri::Window<R>,
    invoke_msg: WindowState,
) -> Result<WindowState, &'a str> {
    match invoke_msg {
        WindowState::Minimized => match window.minimize() {
            Err(_) => return Err("minimize failed"),
            _ => Ok(WindowState::Minimized),
        },
        WindowState::Maximized => match window.maximize() {
            Err(_) => return Err("maximize failed"),
            _ => Ok(WindowState::Maximized),
        },
        WindowState::Normal => {
            let size: LogicalSize<u32> = LogicalSize {
                width: 800,
                height: 600,
            };
            match window.set_size(size) {
                Err(_) => return Err("maximum failed"),
                _ => Ok(WindowState::Normal),
            }
        }
        _ => Err("invoke error"),
    }
}

#[derive(Serialize, Deserialize)]
pub enum WindowState {
    Error,
    Minimized,
    Normal,
    Maximized,
}


#[cfg(test)]
mod test {
    use super::WindowState;

    #[test]
    fn test_state() {
        
        let state = serde_json::to_string(&WindowState::Maximized);
        match state {
            Ok(state) => println!("{}", state),
            Err(_) => todo!(),
        }
    }
}