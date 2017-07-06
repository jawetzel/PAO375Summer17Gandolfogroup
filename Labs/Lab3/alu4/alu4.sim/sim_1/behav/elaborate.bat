@echo off
set xv_path=C:\\Xilinx\\Vivado\\2016.4\\bin
call %xv_path%/xelab  -wto 580a815d74fe46428f0a0990fb5ba427 -m64 --debug typical --relax --mt 2 -L xil_defaultlib -L secureip --snapshot DispAlu4_tb_behav xil_defaultlib.DispAlu4_tb -log elaborate.log
if "%errorlevel%"=="0" goto SUCCESS
if "%errorlevel%"=="1" goto END
:END
exit 1
:SUCCESS
exit 0
