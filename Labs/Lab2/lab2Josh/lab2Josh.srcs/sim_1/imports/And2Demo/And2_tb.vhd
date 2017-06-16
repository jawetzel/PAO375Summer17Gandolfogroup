----------------------------------------------------------------------------------
-- Description:   2-input And Gate (Test Bench)
-- Project:       And2 
-- Program-ID:    And2_tb.vhd
-- Author:        Kuo-pao Yang 
-- Package:       Xilinx Nexys4 DDR Board 
-- Device:        Artix-7 FPGA (XC7A100TCSG324-1) 
-- Software:      Vivado Design Suite
-- Notes:   1. ENTITY: No code (empty)
--          2. ARCHITECTURE: Put simulation code under PROCESS  
----------------------------------------------------------------------------------

LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;

ENTITY and2_tb IS
END and2_tb;

ARCHITECTURE simulate OF and2_tb IS
    COMPONENT and2
        PORT (  a : IN STD_LOGIC;
                b : IN STD_LOGIC;
                c : OUT STD_LOGIC);
    END COMPONENT;
    SIGNAL a: STD_LOGIC;
    SIGNAL b: STD_LOGIC;
    SIGNAL c: STD_LOGIC;
BEGIN
    uut: and2 PORT MAP (a, b, c);
    
    stimulus: PROCESS
    BEGIN
        -- Put test bench stimulus code here
        a <= '0';
        b <= '0';
        WAIT FOR 100 ns;
        a <= '0';
        b <= '1';
        WAIT FOR 100 ns;
        a <= '1';
        b <= '0';
        WAIT FOR 100 ns;
        a <= '1';
        b <= '1';
        WAIT FOR 100 ns;
        a <= '0';
        b <= '0';
    
        WAIT;
    END PROCESS;
END simulate;
