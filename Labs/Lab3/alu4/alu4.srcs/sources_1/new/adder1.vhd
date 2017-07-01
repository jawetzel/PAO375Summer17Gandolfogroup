----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date: 06/22/2017 07:11:57 PM
-- Design Name: 
-- Module Name: adder1 - Behavioral
-- Project Name: 
-- Target Devices: 
-- Tool Versions: 
-- Description: 
-- 
-- Dependencies: 
-- 
-- Revision:
-- Revision 0.01 - File Created
-- Additional Comments:
-- 
----------------------------------------------------------------------------------


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

-- Uncomment the following library declaration if using
-- arithmetic functions with Signed or Unsigned values
--use IEEE.NUMERIC_STD.ALL;

-- Uncomment the following library declaration if instantiating
-- any Xilinx leaf cells in this code.
--library UNISIM;
--use UNISIM.VComponents.all;

entity adder1 is
    port (
        a, b, cIn : in std_logic;
        cOut, sum: out std_logic);
       
end adder1;

architecture Behavioral of adder1 is

begin
    sum <= cIn xor ( a xor b );
    cOut <= (a and b) or ((a xor b) and cIn); 
end Behavioral;
