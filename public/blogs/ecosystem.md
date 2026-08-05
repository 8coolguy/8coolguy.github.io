---
title: "Not so smart Smart Rabbits"
year: 2021
coverImage: "https://imgur.com/siCEa2w.gif"
date: "2021-08-14"
tags:
  - java
  - rl
  - simulation
---
# ***Not so smart Smart Rabbits***   
Hello. This is a simulation I created using Javafx to help show how rabbits reacted in a ecosystem with varied terrain and sometimes a predeator. 
## Inspiration:   
My inspiration for this project came from watching a [youtube video](https://www.youtube.com/watch?v=r_It_X7v-1E&t=152s) where something similar was done in Unity3d that simulated a species and watched the effect it had on the rabbit population. Although my simulation does not used 3d assests and rendering, my simulation is more sophisticated for the genetic traits that are passed down from generation to generation.

## Initial Steps   
To begin the project, I first had to create a stage using javafx. For the land, I created a map tile that would generate land features. These land features were shown as color and I used a [Perlin Noise Algorithm](https://en.wikipedia.org/wiki/Perlin_noise) to make the noise coherent, so the land features looked put together.    
![exampleTerrain](https://imgur.com/tV5gy0K.png)
## Creating the Rabbit
I worked on the RabbitObject class where I gave it behavior and genetic traits. At first, the behavior was random and the rabbit would travel in any direction despite the danger that may lie in its wait. Some of the traits that rabbit would have is given in the code segment below. 
```java
    String gender = new String();//m or f
    //0-1 color trait will  change how attarctive it is to hunt
    int health=7;//starting health goes here
    int deltaHealth=0;
    int age;//0-24  1 per turn\
    //inherited properties form parents 
    double color;//0-1
    double fertility;//0-1
    double size;// will change how  much health it can have
    double speed; //1-3 1space 2 space 3 spaces 
    //stats props 
    int turnsmoved;
    public int gen =0;
    //parents
    RabbitObject mom;
    RabbitObject dad; 
    //no hunger implemented  
    int hydration =0;
```   
The rabbits passed down the traits to their childen, but it not in the way that genes actually work. It passed down the average trait value between its parents and grand parents. The main traits that I kept track of was color, fertility, size, and speed.These were important becasue it forecasted wether the rabbit population would stay alive. Implementing a more sophisticated genes system would be cool to see.
## A small detail
I used Jfreechart, a graphing library for java, to keep track of the population and the genetic traits for the rabbits. These graphs updated as the moves of Rabbits updated.    
![exampleGraph](https://imgur.com/Gx3wTHX.png)  
## Rabbit-Only Simualtions   
As I simulated the rabbits, I noticied that without any intervention from other animals the rabbit population would increase fastly to the maximum population. This rate of growth is called logisitic growth and it shows in my simulations. Once the physical space ran out the rabbits would reach the carrying capacity. In reality,the carrying capacity is determined by their limit of the resources in the enviorment. Another observation that I noticed is that the fertility of the rabbits stopped increasing after the rabbit population reached the carrying capacity. This probably happened because once the rabbit population stablized their was no need in having the highest possible fertility. The size seemed to keep incresing even after the population stablized. Size trait would contribute to the starting health trait, so it seems that health was always important in the harsh enviorment.  
![rabbitOnlySim](https://imgur.com/siCEa2w.gif)   
![rabbitOnlySimstats](https://imgur.com/FGh99Go.png)
![rabbitOnlyPop](https://imgur.com/gBOgvTx.png)

## Introduction of the Fox
After playing around with only rabbits, I decided to add a predator class, the Fox Object. The fox object inheirted from the rabbit object. Its movement was also randomly generated like the original rabbit. I made sure that the foxes had a hunger trait that made them eat the rabbits if found in the same MapTile. The fox population would not survive eat rabbits and theya had less fertility stats, so they do not survive by over-reproducing. Also the foxes would only hunt the rabbits with color lower than their own. The simualation siginificantly changed with the introduction of the rabbits. The long term result would be up in the air. There would be simualtions where the foxes quickly went extinct, or simulations where the foxes would eat all the rabbit leading them to also go extinct.  An observation that I noticied is that color of the rabbits would be fastet growing trait among the rabbits.
```java 
	public void eat(MapTile tile) {
		for(int i =0;i<tile.MAX_PER_TILE;i++) {
			RabbitObject hunted = tile.showWhere()[i];
			if((!(hunted instanceof FoxObject)) && hunted !=null) {
				if(hunted.getColor() <this.color) {
					//infoSystem.out.println("Age: "+hunted.getAge());
					tile.here[i].isEaten();
					this.hunger =0;
				}
			}
		}
	}
```
The foxes choosing what type of rabbits was the entire reason for the evolution of the rabbits. Only the most suitable rabbits would survive for the next generation.    
## The Smart Rabbits   
The next evolution of the simulation was to create a rabbit that can learn what the right movement was to maxmize its lifespan and reprodue the most. I used a reinforcement learning algorithm called Qlearn which is an off-policy learning algoritm that takes random actions to learn how to navigate the game state that it was in. The algoritm tries to learn a policy that will create the best moving rabbit in the simulation. I used the [java-reinforcement-learning](https://github.com/chen0040/java-reinforcement-learning) library. I began implementing this by creating a game state. The game state was created by looking at the surrounding tiles creating a 16 bit integer that incapsulated the state as shown in the picture below.    
![exampleState](https://imgur.com/qeLwlNP.png)     
When the model began would do random moves to learn what would happen. This is called the exploring phase. Once it had enough information on the state information, it would begin the exploiting phase where it would choose what it thought is the best  move. With the gamestate, I was able to update the model after rewarding the rabbits for a good move. The reward was handed out like this.
```java
	public void updateStrategy(int oldState,int newState,int action,SuperRabbitObject rabbit,DynamicPopulationTracker x) {
		//infoSystem.out.println("OldState: "+oldState+" New State: "+newState);
		//the reward needs to be based only on the action id eaten pretty much,color,hydration
		double reward=0;
		if(rabbit.hydration ==0) {
			reward+=50;
		}
		if(rabbit.deltaHealth == rabbit.greenEffect) {
			reward+=75;
		}else {
			reward-=3*rabbit.deltaHealth;
		}
		if(rabbit.eaten) {
			reward-=100;
		}
		
		System.out.println("Reward: "+reward);
		this.agent.update(oldState, action, newState, reward);
	}
```
### A Not so Smart Rabbit
The smart rabbits did  have smarter movements,but I ran into a problem here when I realized that the optimal movemnt of individual rabbits did not lead to salvation for the entire rabbit kind. As shown in the code, the rabbit would be rewarded for being in the green tile and blue tile. This means that small groups of rabbits would cluster and move back and forth until they dead from age or health. This would lead to a demise in the rabbit population. When the rabbits moved randomly, they had a chance to be instantly killed, but they were able to reproduce quickly with different rabbits. This was not the case in small isolated groups. This lead the reinforcement learned rabbits to go extinct much quicker than those of the dumber kind of rabbits. 
![exampleSmartRabbitOnly](https://imgur.com/cT6vrYW.gif)   
![exampleSmartRabbitFox](https://imgur.com/Dn5RA1X.gif)   
The traits of these rabbits showed the same patterns as the normal rabbits above,but these rabbits went extinct faster.   

## **Conclusion**
This project made me learn alot more of java and ecosystems as a whole. On the development side, I learned how to use eclipse and maven to deploy my project. I was also able to freshen up my java skils. I also learned how to make a basic reinforcement model: Qlearn. I hope to improve on that part soon. I think what this project turned into deviated far from what I thought would happen. I was trying to create something similar to [Celular Automoton] where I would have a simple rule and watch the chaos unfold, but instead I was more hands on with affecting each part of the simulation. I might come abck to this where I create a better model that learns from the population of the rabbits and creates a strong rabbit population. I may even apply the reinforcement model to the foxes to see how it affects the rabbit population. 

## *Resources:*
https://www.youtube.com/watch?v=r_It_X7v-1E&t=152s
https://en.wikipedia.org/wiki/Perlin_noise
https://towardsdatascience.com/simple-reinforcement-learning-q-learning-fcddc4b6fe56
https://github.com/chen0040/java-reinforcement-learning
https://www.khanacademy.org/science/ap-biology/ecology-ap/population-ecology-ap/a/exponential-logistic-growth

