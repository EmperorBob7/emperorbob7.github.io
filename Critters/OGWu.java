
import java.awt.Color;
import java.util.ArrayList;


public class OGWu extends Critter {

    private boolean iteration;
    private CritterInfo info;
    private char[] ary = {Character.highSurrogate(0x1F004), Character.lowSurrogate(0x1F004)};
    private ArrayList<Action> queue = new ArrayList<>();
    private String zhongEmoji = String.copyValueOf(ary);
    private boolean reachedWall = false, findingSlot = false, inGroup = false,ranger = false;
/*
    To Do: Make the critter walk back if they are finding a spot and reached Northern wall,
            and if they reached northern wall then become a RANGER 
            note: Ok..this is kinda hard and doesn't work very well.
    */
    public Critter.Action getMove(CritterInfo info) {
        /*infecting and protecting self is priority #1*/
        if (info.getFront() == Neighbor.OTHER) {
            return Action.INFECT;
        }
        /*Doing items in the queue is priority #2*/
        if (queue.size() > 0) {
            Action nextAction = queue.get(0);
            queue.remove(0);
            return nextAction;
        }
        /*If the critter is a ranger, run around*/
        if(ranger) {
        	if(info.getFront() == Neighbor.OTHER) {
                return Action.INFECT;
            }
            else if(info.getFront() == Neighbor.EMPTY) {
                return Action.HOP;
            }
            else if(info.getFront() == Neighbor.WALL || info.getRight() == Neighbor.WALL) {
                return Action.RIGHT;
            }
            else if(info.getFront() == Neighbor.SAME) {
                return Action.RIGHT;
            }
            return Action.INFECT;
        }
        
        /*Below is the early game set up*/

        /*Step 1, reach the western wall and form a straight line*/
        if (!reachedWall) {
            if (info.getDirection() != Direction.WEST && !findingSlot) { //Face west first, the !findingSlot is so that it doesn't turn while looking for a spot
                return Action.LEFT;
            }
            if (info.getDirection() == Direction.WEST) {
                if (info.getFront() == Neighbor.SAME) {//If there is a Wu is in front, then began finding a slot
                    findingSlot = true;
                    return Action.LEFT;
                } else if (info.getFront() == Neighbor.WALL) { //Reached wall, began step 2
                    reachedWall = true;
                    return Action.RIGHT;
                }
                return Action.HOP; //If everything else is false, hop toward the wall
            }
            /*If there is an empty spot to the left while finding a spot, then turn left.
	       * I am not worried about them reaching the Southern Wall without finding a 
	       * spot because in step 2 all the ones near the wall will move up/north */
            if (findingSlot) {
                if(info.getDirection() == Direction.EAST) {//Facing east means the critter's path was previously blocked
                    if (info.getRight() == Neighbor.EMPTY) {
                        return Action.RIGHT;
                    }
                    return Action.HOP;
                }
                if(info.getFront() == Neighbor.SAME) { //If path is blocked, turn left and face east
                    return Action.LEFT;
                }
                if (info.getRight() == Neighbor.EMPTY) {
                    findingSlot = false;
                    return Action.RIGHT;
                }
                
                if(info.getFront() == Neighbor.SAME && info.getDirection() == Direction.SOUTH) { //If reached Southern Wall, then turn back
                    queue.add(Action.LEFT);
                    return Action.LEFT;
                }
                if(info.getFront() == Neighbor.WALL && info.getDirection() == Direction.SOUTH) {
                    ranger = true; //Formation is filled up, become a ranger and run around
                    return Action.RIGHT;
                }
                return Action.HOP;
            }
        }

        /*Step 2: Get into formation and get into battle position, the variable
         *        name is InGroup because InFormation look like information*/
        if (!inGroup && reachedWall) {
            if ((info.getFrontDirection() == Direction.NORTH && info.getFront() == Neighbor.SAME) || info.getFront() == Neighbor.EMPTY) {
                return Action.HOP; //If the Wu in front is facing North/Up(indicated they are not in formation), or its empty up front. Hop.
            }
            if ((info.getFrontDirection() == Direction.EAST && info.getFront() == Neighbor.SAME) || info.getFront() == Neighbor.WALL) {
                inGroup = true;
                queue.add(Action.HOP);
                return Action.RIGHT;//If the Wu in the front is facing East/Right(Which indicate they are in battle formation) or there's a wall in front, turn right
            }
        }
        if (inGroup) {
            if ((info.getRight() == Neighbor.EMPTY || info.getRight() == Neighbor.OTHER)&& info.getFront() != Neighbor.OTHER){
                queue.add(Action.LEFT);
                return Action.RIGHT;
            }
            if (info.getLeft() == Neighbor.EMPTY || info.getLeft() == Neighbor.OTHER) {
                queue.add(Action.HOP);
                inGroup = false;
                return Action.LEFT;
            }
            /*if(info.getBack() == Neighbor.EMPTY || info.getBack() == Neighbor.OTHER) {
                inGroup = false;
                return Action.RIGHT;
            }*/

        }
        return Action.INFECT;
    }
    
    public String toString() {
        return "中";
    }

    public Color getColor() {
        if(ranger)
        	return Color.green;
    	if(inGroup)
        	return Color.red;
        if(findingSlot)
        	return Color.orange;
        if(reachedWall)
        	return Color.yellow;
        return Color.cyan;
    }
}

