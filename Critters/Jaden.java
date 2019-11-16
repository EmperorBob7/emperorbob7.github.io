
import java.awt.Color;

/**
 *
 * @author s652803
 */
public class Jaden extends Critter {


    public Color getColor() {
        return Color.BLUE;
    }

    @Override
    public Action getMove(CritterInfo info) {
        if (info.getFront() == Neighbor.OTHER) 
            return Action.INFECT;
        else if (info.getFront() == Neighbor.WALL || info.getFront() == Neighbor.SAME) 
            return Action.RIGHT;
         else 
            return Action.HOP;
        

    }

    @Override
    public String toString() {
        return "🤛";
    }
}
