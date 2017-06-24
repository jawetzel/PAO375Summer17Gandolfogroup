----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date: 06/06/2017 09:52:54 PM
-- Design Name: 
-- Module Name: adder4 - Behavioral
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

entity adder4 is
    GENERIC(CONSTANT N: INTEGER := 4);
    PORT(
        a: IN STD_LOGIC_VECTOR(N-1 DOWNTO 0); -- Input a[3..0]
        b: IN STD_LOGIC_VECTOR(N-1 DOWNTO 0); -- Input b[3..0]
        cOut: OUT STD_LOGIC; -- Output cCout
        sum: OUT STD_LOGIC_VECTOR(N-1 DOWNTO 0) -- Output sum[3..0]
    );
end adder4;

architecture Behavioral of adder4 is
    signal out1, out2, out3 : std_logic;

    COMPONENT Adder1
        PORT(
            a, b, cIn: IN STD_LOGIC;
            cOut, sum: OUT STD_LOGIC);
    END COMPONENT;
SIGNAL carry_sig: STD_LOGIC_VECTOR(N DOWNTO 0);

begin
    U1 : Adder1 PORT MAP (a => a(0), b => b(0), cIn => '0', cOut => out1, sum => sum(0));
    U2 : Adder1 PORT MAP (a => a(1), b => b(1), cIn => out1, cOut => out2, sum => sum(1));
    U3 : Adder1 PORT MAP (a => a(2), b => b(2), cIn => out2, cOut => out3, sum => sum(2));
    U4 : Adder1 PORT MAP (a => a(3), b => b(3), cIn => out3, cOut => cOut, sum => sum(3));

end Behavioral;
