
import java.awt.*;

public class JamesC extends Critter {

    private int infects;
    private int idle;

    public JamesC() {
        infects = 0;
        idle = 0;
    }

    public Color getColor() {
        return Color.GREEN;
    }

    //add behavior to turn and hop away from walls, has priority over neighbors being another JamesC
    public Action getMove(CritterInfo info) {
        while (infects < 5 && idle < 100) {
            if (info.getFront() == Neighbor.OTHER) {
                idle = 0;
                return Action.INFECT;
            }
            else if (info.getLeft() == Neighbor.OTHER) {
                idle = 0;
                return Action.LEFT;
            }
            else if (info.getRight() == Neighbor.OTHER) {
                idle = 0;
                return Action.RIGHT;
            }
            else if(info.getFront() == Neighbor.WALL){
                return Action.RIGHT;
            }
            else if (info.getFront() == Neighbor.SAME) {
                return Action.RIGHT;
            }
            else if (info.getRight() == Neighbor.SAME || info.getLeft() == Neighbor.SAME
                    || info.getBack() == Neighbor.SAME) {
                return Action.HOP;
            }
            else {
                idle++;
                return Action.LEFT;
            }
        }
        if (info.getFront() == Neighbor.OTHER) {
            return Action.INFECT;
        }
        else if (info.getLeft() == Neighbor.OTHER) {
            return Action.LEFT;
        }
        else if (info.getRight() == Neighbor.OTHER) {
            return Action.RIGHT;
        }
        else if(info.getBack() == Neighbor.WALL && (info.getFront() == Neighbor.OTHER
                || info.getFront() == Neighbor.EMPTY)){
            return Action.INFECT;
        }
        else if(info.getBack() == Neighbor.WALL){
            return Action.INFECT;
        }
        else if(info.getFront() == Neighbor.SAME || info.getFront() == Neighbor.WALL){
            return Action.RIGHT;
        }
        else if (info.getFront() == Neighbor.EMPTY) {
            return Action.HOP;
        }
        else if ((info.getLeft() == Neighbor.WALL || info.getFront() == Neighbor.WALL)
                && info.getRight() == Neighbor.EMPTY) {
            return Action.RIGHT;
        }
        else if (info.getLeft() == Neighbor.WALL || info.getLeft() == Neighbor.SAME) {
            return Action.HOP;
        }
        else {
            return Action.HOP;
        }
    }

    public String toString() {
        char[] ary = {Character.highSurrogate(0x1F611), Character.lowSurrogate(0x1F611)};

        String fingerEmoji = String.copyValueOf(ary);

        return fingerEmoji;
    }
    /*accidental venus flytrap behavior
    if (info.getFront() == Neighbor.OTHER) {
            return Action.INFECT;
        }
        else if(info.getLeft() == Neighbor.OTHER){
            return Action.LEFT;
        }
        else if(info.getRight() == Neighbor.OTHER){
            return Action.RIGHT;
        }
        else if(info.getFront() == Neighbor.SAME){
            return Action.LEFT;
        }
        else if(info.getRight() == Neighbor.SAME || info.getLeft() == Neighbor.SAME
                || info.getBack() == Neighbor.SAME){
            return Action.HOP;
        }
        else{
            return Action.LEFT;
        }
    
     */
}
