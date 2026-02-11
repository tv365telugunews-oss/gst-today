@echo off
echo ========================================
echo    CLEAN AND BUILD APK
echo ========================================
echo.

echo [1/3] Stopping Gradle Daemon...
call gradlew --stop
echo.

echo [2/3] Cleaning build files...
if exist .gradle (
    echo Deleting .gradle folder...
    rmdir /s /q .gradle
)
if exist app\build (
    echo Deleting app\build folder...
    rmdir /s /q app\build
)
if exist build (
    echo Deleting build folder...
    rmdir /s /q build
)
echo ✓ Clean complete!
echo.

echo [3/3] Building APK...
call gradlew assembleDebug --stacktrace
if %errorlevel% neq 0 (
    echo.
    echo BUILD FAILED!
    echo.
    echo Trying with --refresh-dependencies...
    call gradlew assembleDebug --refresh-dependencies --stacktrace
    if %errorlevel% neq 0 (
        echo.
        echo BUILD STILL FAILED!
        echo.
        echo Please check the error above.
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo    BUILD SUCCESS!
echo ========================================
echo.
echo APK Location:
echo %cd%\app\build\outputs\apk\debug\app-debug.apk
echo.
pause
explorer app\build\outputs\apk\debug
