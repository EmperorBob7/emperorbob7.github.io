
import java.awt.Color;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author s532338
 */
public class Dragon extends Critter{
    private boolean polar;
    private int postion;

    
    
    
    @Override
    public String toString() {
       
            return "🐉";
        
    }

    public Color getColor() {
        return Color.YELLOW;
    }

    public Critter.Action getMove(CritterInfo info) {
         if(info.getFront()==Critter.Neighbor.OTHER){
            return Action.INFECT;
        }  else if(info.getLeft()==Critter.Neighbor.OTHER){
            return Action.INFECT.LEFT;
        } else if(info.getRight()==Critter.Neighbor.OTHER){
            return Action.INFECT.RIGHT;
        }
        return Critter.Action.LEFT;
    }
}
