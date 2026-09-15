@echo off
cd /d "%~dp0"
title Traversi (Travel DIY RM) - Hackathon System Runner
color 0A
cls

echo =======================================================
echo          TRAVERSI - TRAVEL DIY RM (PROTOTYPE)
echo      Bajet Berapa Boleh Pergi Mana? - Hackathon 2026
echo =======================================================
echo.

:: 1. Semak sama ada Node.js dipasang
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [RALAT] Node.js tidak dijumpai dalam komputer anda.
    echo Sila muat turun dan pasang Node.js dari https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: 2. Bebaskan Port 3000 jika ada proses sangkut (mengelakkan konflik port)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    echo [INFO] Menutup proses lama yang memegang port 3000 - PID %%a
    taskkill /f /pid %%a >nul 2>nul
)

:: 3. Semak fail node_modules
if not exist "node_modules\next\" (
    echo [INFO] Kebergantungan belum lengkap dipasang. Memasang pakej npm...
    call npm install
    if %errorlevel% neq 0 (
        echo [RALAT] Gagal memasang pakej npm.
        pause
        exit /b 1
    )
)

echo [1/2] Membuka pelayar (browser) di http://localhost:3000 ...
start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:3000"

echo [2/2] Menjalankan pelayan pembangunan Next.js (Fast Refresh diaktifkan)...
echo.
echo TIP: Pelayan ini mempunyai Hot Reload (Fast Refresh). 
echo Sebarang perubahan kod akan dikemas kini serta-merta tanpa perlu restart!
echo.
echo Tekan Ctrl+C dalam terminal ini untuk menghentikan server bila selesai.
echo =======================================================
echo.

call npm run dev

pause
