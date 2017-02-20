# EventClock
Timekeeper for speakers at events. This Application is ment to be visible only to the person who speaks at an event in order to keep track of the time.

## Settings

The Application gives you some options for the clock in the settings menu. You can open the settings by clicking on "Settings" in the top right corner

### Time Name
In the input field _Time name** you can enter a custom name for the clock. By doing this. The Title of the page will be renamed after your title. This is helpfull if you are using several instances of the application through diffrent tabs.

### Count Upwards
By checking this checkbox alters the clock from the default setting of counting down, to counting up.

### Set Time
The _Set Time_** input has options for __hours__ , __minutes__ and __secounds__. The _Set Time_** is the target time for the application. If a speaker has 1 hour or 5 minutes for their presentation. This is where you set this limit.

### Warning Time
The _Warning Time_** is the time where the user gets a warning that the time is running out. This is done by changing the color of the numbers to orange. Warning Time is the time the speaker has left and calculated in two ways.

1. When counting down. The color changes when warning time is reached.
2. When counting up. The color changes when (Set Time - Warning time) is reached.

#### Alert Color
When the Set Time is within 10 secounds the text turns **red**

### Warning Text
The this is the text displayed when the clock has reach the _Set Time_**. Either 0, or the the counted upwards. The text appers pulsing red under the clock.

## Customized logo
You can can change the logo by replacing the logo.png in the image folder with your choice of logo.

*Your logo file has to be named logo and be a .png file*

## Dependencies

This application has been created with the following dependancies(all included in the repository):
		
		*[Bootstrap 4 alpha](https://v4-alpha.getbootstrap.com/ "Bootstrap 4" )
		*[FlipClock.js](http://flipclockjs.com/ "flipclock.js")
		*[FontAwesome](http://fontawesome.io/ "FontAwesome")
		*[Animate.css](https://daneden.github.io/animate.css/ "Animate.css")

You don't need to install any of these. They are listed here to be credited


