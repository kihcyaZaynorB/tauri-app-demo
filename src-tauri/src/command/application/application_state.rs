use tauri::Runtime;

#[tauri::command]
pub async fn exit<R: Runtime>(
    app: tauri::AppHandle<R>,
    _window: tauri::Window<R>,
) -> Result<(), String> {
    app.exit(0);
    Ok(())
}
