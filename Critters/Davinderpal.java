// This defines a simple class of critters that infect whenever they can and
// otherwise just spin around, looking for critters to infect.  This simple
// strategy turns out to be surpisingly successful.

import java.awt.*;


public class Davinderpal extends Critter {

    private Color c;
    char[] ary = {Character.highSurrogate(0x1F234), Character.lowSurrogate(0x1F234)};

    String emoji = String.copyValueOf(ary);

    private static int bob = 0;
    private static boolean isTouchingWall = false;
    private static boolean leftEnemy = false;
    private static boolean rightEnemy = false;
    private int id;
    private int waitTurns = 0;
    private boolean firstTime = true;
    private boolean leftAgain = false;
    private boolean rightAgain = false;
    private boolean atBottom = false;
    private boolean onRight = false;
    private boolean stuck = false;
    private boolean isLeftMost = false;
    private int idle = 0;

    public Action getMove(CritterInfo info) {
        if (firstTime) {
            firstTime = false;
            bob++;
            id = bob;
            if(id >= 128) {
                bob = 0;
                id = 0;
            }
            c = new Color(id+25,id*2,id/5);
        }
        if(idle >= 500) {
        	if(info.getFront() == Neighbor.OTHER)
        		return Action.INFECT;
        	if(leftAgain) {
        		leftAgain = false;
        		return Action.LEFT;
        	}
        	if(rightAgain) {
        		rightAgain = false;
        		return Action.RIGHT;
        	}
        	if(info.getLeft() == Neighbor.OTHER) {
        		leftAgain = true;
        		return Action.LEFT;
        	}
        	if(info.getRight() == Neighbor.OTHER) {
        		rightAgain = true;
        		return Action.RIGHT;
        	}
        }
        else {
	        //Turn again
	        if (leftAgain) {
	            leftAgain = false;
	            return Action.LEFT;
	        }
	        if (rightAgain) {
	            rightAgain = false;
	            return Action.RIGHT;
	        }
	        //Dont die
	        if (info.getFront() == Neighbor.OTHER) {
	            enemyLeft(false);
	            enemyRight(false);
	            return Action.INFECT;
	        }

	        //go to bottom
	        if (!atBottom) {
	            if (info.getDirection() != Direction.EAST && !stuck) {
	                return Action.RIGHT;
	            }
	            if (info.getFront() == Neighbor.WALL) {
	                atBottom = true;
	                return Action.LEFT;
	            }
	            if (info.getFront() == Neighbor.SAME) {
	                stuck = true;
	                return Action.RIGHT;
	            }
	            if (stuck) {
	                if (info.getLeft() == Neighbor.EMPTY) {
	                    stuck = false;
	                    return Action.LEFT;
	                }
	            }
	            return Action.HOP;
	        }
	        //go right
	        if (!onRight) {
	            if (info.getFront() == Neighbor.WALL) {
	                onRight = true;
	                touchedWall();
	                return Action.LEFT;
	            }
	            if (isTouchingWall && info.getFront() != Neighbor.SAME) {
	                return Action.HOP;
	            }
	            if (!isTouchingWall) {
	                return Action.HOP;
	            }
	            onRight = true;
	            return Action.LEFT;
	        }
	        //Clear Space
	        if (info.getRight() == Neighbor.EMPTY && !isLeftMost) {
	            //onRight = false;
	            return Action.RIGHT;
	        }
	        //turn left-most
	        if (waitTurns < 10) {
	            waitTurns++;
	        }
	        if (waitTurns == 10) {
	            if (info.getLeft() == Neighbor.EMPTY) {
	                isLeftMost = true;
	                return Action.LEFT;
	            }
	            waitTurns++;
	        }
	        //test right
	        
	        if (info.getRight() == Neighbor.OTHER) {
	            enemyRight(true);
	            return Action.RIGHT;
	        }
	        //test left
	        if (info.getLeft() == Neighbor.OTHER) {
	            enemyLeft(true);
	            return Action.LEFT;
	        }
	        //enemyleftree
	        
	        if (leftEnemy) {
	            enemyLeft(false);
	            return Action.LEFT;
	        }
	        if (rightEnemy) {
	            enemyRight(false);
	            return Action.RIGHT;
	        }
	        idle++;
	        return Action.INFECT;
        }
        return Action.INFECT;
    }

    public static void touchedWall() {
        isTouchingWall = true;
    }

    public static void enemyLeft(boolean val) {
        leftEnemy = val;
    }

    public static void enemyRight(boolean val) {
        rightEnemy = val;
    }

    public Color getColor() {
        return c;
    }

    public String toString() {
        return "負";
    }
}
