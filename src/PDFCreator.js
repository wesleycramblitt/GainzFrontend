import jsPDF from 'jspdf';
import logo from './img/logo.PNG';
import powertower from './img/powertower.jpg';
import pullup from './img/pullup.jpg';
import dips from './img/dipbars.jpg';
import barbell from './img/barbell.jpg';
import powerrack from './img/powerrack.jpg';
import bumpers from './img/BumperPlates.jpg';
import machine from './img/machine.jpg';
import preworkout from './img/preworkout.jpg';
import protein from './img/protein.jpg';
import thermo from './img/thermogenic.jpg';

class PDFCreator {
    constructor() {
        this.lMargin=15; //left margin in mm
        this.rMargin=15; //right margin in mm
        this.pdfInMM=210;  // width of A4 in mm
        this.spacing = 5;

        this.center=this.pdfInMM/2;
        this.height = 297;
        this.tMargin = 15;
        this.Y = this.tMargin;

        this.doc = new jsPDF("p","mm","a4");

        this.doc.setFont('Helvetica');

        
    }
    newLine() {
        this.Y += this.spacing;
    }
    addImage(src, ext, w, h) {
        var img = new Image();
        img.src = src;

        if ((this.Y + h) > this.height - this.tMargin) {
            this.doc.addPage();
            this.Y = this.tMargin;
        }

        this.doc.addImage(img, ext,this.lMargin, this.Y,w,h);

        this.Y += h; //Move Y past image

        this.Y += this.spacing+3; //Get default line spacing

        
    }

    addText(text) {
        var lineHeight = this.doc.getLineHeight(text) / this.doc.internal.scaleFactor;
        var splittedText = this.doc.splitTextToSize(text, this.pdfInMM - this.lMargin - this.rMargin);
        var lines = splittedText.length;

        var textY = lineHeight*lines;
        if ((this.Y + textY) > this.height- this.tMargin) {
            this.doc.addPage();
            this.Y = this.tMargin;
        }

        this.doc.text(
                splittedText,
                this.lMargin,
                this.Y);

        this.Y += textY;

        this.Y += this.spacing;
    }

    addHeading1(text) {
        this.setFontHeading1();
        this.addText(text);
    }

    addHeading2(text) {
        this.setFontHeading2();
        this.addText(text);
    }

    addHeading3(text) {
        this.setFontHeading3();
        this.addText(text);
    }

    addParagraph(text) {
        this.setFontNormal();
        this.addText(text);
    }

    setFontHeading1() {

        this.doc.setFontSize(18);
        this.doc.setFontStyle("bold");
    }

    setFontHeading2() {

        this.doc.setFontSize(14);
        this.doc.setFontStyle("bold");
    }
    setFontHeading3() {

        this.doc.setFontSize(12);
        this.doc.setFontStyle("bold");
    }

    setFontNormal() {

        this.doc.setFontSize(12);
        this.doc.setFontStyle("normal");
    }

    save() {
       this.doc.save("routine.pdf");
    }

    getURI() {
        return this.doc.output("datauristring");
    }

    headingWithLink(heading,text,url) {
        var Y = this.Y;
        this.addHeading3(heading);
        var headingWidth = this.doc.getStringUnitWidth(heading) * 12;
        var X = headingWidth + this.spacing;
        this.doc.textWithLink(text,X, Y,{url:url});
        this.Y += 3; //links need a little extra spacing.

        //Y should be updated in addHeading2 as well
    }

    addPage() {
        this.doc.addPage();
        this.Y = this.tMargin;
    }

    link(linkText,url) {
        this.setFontNormal();
        this.doc.setTextColor(0,0,200);
        this.doc.textWithLink(linkText,this.lMargin, this.Y,{url:url});

        const textWidth = this.doc.getTextWidth(linkText);
        this.doc.line(this.lMargin, this.Y+1, this.lMargin + textWidth, this.Y+1);

        this.doc.setTextColor(0,0,0);
        this.Y+= this.spacing+5;
    }

    static async getRoutinePDF(routinedata, setStateAsync) {

        
        var pdfCreator = new PDFCreator();

        pdfCreator.addImage(logo, 'PNG', 100,45);

        pdfCreator.addHeading1("Introduction");

        pdfCreator.addParagraph("Hi, I’m Wes, the creator of Gainz workout routine generator. I originally created the generator to make it easier to write new routines for myself, but I later noticed that many people have no idea where to start when it comes to working out and don’t necessarily want to spend money on a personal trainer to teach them. ");

        pdfCreator.addParagraph("So, I created a publicly available version that is much easier to use. The routines generated ensure that each muscle is worked in a balanced way while also preferring compound movements.  I hope that the information and workout routine in this PDF are enough to get you started in the world of fitness and help you realize the strength and beauty of which your body is capable of. If you are experienced with fitness, I hope this routine helps you further achieve the goals that you have set out to accomplish.");
        
        pdfCreator.addParagraph("You don't neccesarily need to learn every detail in this document. It is better used as a reference when needed. Feel free to skip down to the workout equipment section");

        pdfCreator.addPage();

        pdfCreator.addHeading1("Workout Routine Basics");
        
        pdfCreator.addParagraph("It is important to understand basic workout routine terminology and have a plan set in place as you move forward in your fitness journey.");
        await setStateAsync({pdfProgress:10});
        pdfCreator.addHeading2("Volume");

        pdfCreator.addParagraph("Volume is the number of reps performed usually measured per muscle per week. 60 reps a week is considered low while 120 reps a week is considered very high. In the case of bodyweight, this number can be much higher as you progress.");

        pdfCreator.addHeading2("Rep Scheme");

        pdfCreator.addParagraph("The number of reps you do at a time has been found to directly correlate to which muscle fibers are activated. The general accepted standard is that 1-5 reps (very heavy weight) is for training strength, 6-12 reps (medium to heavy weight) is for training for muscular size, and 12 reps or above with lighter weight is for training muscular endurance. However, it should be noted that some people, especially in the world of bodyweight training, believe that doing extremely high volume sets result in great increases in muscular size. For example, doing 1000 pushups in a day to acquire a large chest. No one has reached a definitive scientific conclusion on either strategy. However, I think “all roads lead to Rome” applies in this scenario. I can assure you that whether you do 1000 pushups a day or if you bench press in the 6-12 reps range you will build muscle with the proper diet, which we will get to later.");
        


        pdfCreator.addHeading2("Frequency");
        pdfCreator.addParagraph("Frequency is the number of times per week that a muscle is worked. Many trainers argue that a more frequency is better than less frequency. Specifically, that two to three times a week is perfect for most training goals. This results in a functional training system where the body is worked as a complete unit and tends to result in a more athletic build and functional body.");

        pdfCreator.addParagraph("However, a lot of bodybuilders work each muscle one time a week in a 5 to 6 part split. For example, Legs, Chest, Back, Shoulders, Arms. It should be noted that many bodybuilders that use this split are on performance enhancing drugs that put their body in a completely different state for building muscle than a natural athlete.");

        pdfCreator.addHeading2("Workout Technique");
        pdfCreator.addParagraph("Gainz generator does not include instruction on form, but instead links you to a google search on specific workouts. It is very important that you learn and practice proper form on each workout. Never go heavier than you can lift with perfect range of motion and form. There is a wealth of knowledge online on how to perform each exercise.");

        await setStateAsync({pdfProgress:20});
        pdfCreator.addHeading2("Progressive Overload");
        pdfCreator.addParagraph("Progressive overload is the key to making progress in a workout routine. Simple stated, it is accomplished by adding more volume, doing more weight, or taking shorter breaks in between sets. If you are not progressively overloading it is very unlikely that you are going to significantly change your level of fitness. That is why it is important to track your performance and to plan to increase performance each week.");

        pdfCreator.addPage();
        pdfCreator.addHeading2("Rest Days");
        pdfCreator.addParagraph("Rest days are when your body changes! As your body heals from past workouts, you get stronger, better, leaner, whatever your goal is. It is important to get your blood moving on a rest day and to continue to eat properly. Some good rest day activities include walking, a light jog, hiking, or other light exercises. This helps your body heal faster by way of nutrients in the blood stream.");
        
        pdfCreator.addPage();
        pdfCreator.addHeading1("Workout Equipment");
        pdfCreator.addParagraph("Most people prefer to get a gym membership and use the equipment available at the gym. If that is your preference, there is nothing wrong with that. However, there are a few drawbacks to a traditional gym membership that I have noticed, especially if you are a beginner:");


        pdfCreator.addParagraph("It can be embarrassing to learn new movements in front of others, at the most convenient hours of the day gyms become busy and you have to wait in line to access equipment, you may be rushed to finish your sets, and especially in the case of women, you may have to deal with the “Gym bros” trying to hit on you or creepily staring at you from the corner of the room. My solution to this problem was to purchase at home equipment.");
        
        pdfCreator.addParagraph("With your own equipment, you will be able to privately practice new movements, take as long as you like to workout without worrying about others, blast any music you prefer to listen to, and workout whenever you like without worrying about traffic and how busy the gym is.");

        pdfCreator.addHeading2("Bodyweight Equipment");
        pdfCreator.addParagraph(`If you are interested in a bodyweight program, at the very least you will need a way to do pullups and a way to do dips. Most other bodyweight workouts don’t require any equipment. So, I have included a few popular equipment options below:`);

        pdfCreator.addParagraph("For an all in one solution:");
        pdfCreator.addImage(powertower, 'jpg', 50,60);

        pdfCreator.link("Power Tower", "https://amzn.to/2l4F534");

        pdfCreator.addParagraph("For a smaller indoor solution try these two products:");

        pdfCreator.addImage(pullup, 'jpg', 50,50);

        pdfCreator.link("Doorway Pullup Bar", "https://amzn.to/2l4G3MK");

        pdfCreator.addImage(dips, 'jpg', 50,50);

        pdfCreator.link("Dip Bar", "https://amzn.to/2l7jd7f");
        await setStateAsync({pdfProgress:20});

        pdfCreator.addHeading2("Weighted Equipment");
        pdfCreator.addParagraph("Most weighted programs rely on barbells and dumbbells, which have been proven to activate more muscle fibers and stabilizer muscles, resulting in greater improvements in hypertrophy and strength. However, some people prefer machines and cables because of injuries, having limited ranges of motion, or just prefering the isolation that a machine provides. Either way here are some recommendations for at home weighted equipment:");

        pdfCreator.addParagraph("My personal favorite home gym option, although more expensive, you are getting the most bang for your buck with this option:");

        pdfCreator.addParagraph("Barbell for performing all lifts:");
        await setStateAsync({pdfProgress:30});
        pdfCreator.addImage(barbell, 'jpg', 50,50);

        pdfCreator.link("Barbell", "https://amzn.to/2jEOiia");

        pdfCreator.addParagraph("Rubber weights for safety, less noise, and the ability to deadlift anywhere:");

        pdfCreator.addImage(bumpers, 'jpg', 50,50);

        pdfCreator.link("Rubber weights", "https://amzn.to/2l72BMP");

        pdfCreator.addParagraph("Power rack for squats and presses");

        pdfCreator.addImage(powerrack, 'jpg', 50,50);

        pdfCreator.link("Power rack ", "https://amzn.to/2l67Psi");

        //TODO put bench here

        pdfCreator.addParagraph("If you prefer an all in one option and like machines, this is another option:");

        pdfCreator.addImage(machine, 'jpg', 50,50);

        pdfCreator.link("Machine Total Gym", "https://amzn.to/2l75qNS");
        await setStateAsync({pdfProgress:40});

        pdfCreator.addPage();
        //Nutrition//////////////////////////////////
        pdfCreator.addHeading1("Nutrition");

        pdfCreator.addParagraph("Nutrition is arguably the most important aspect of training. However, I will not go into a lot of detail on the subject. Instead, I will keep it very simple and focus on macronutrients. There are 3 macronutrients:");

        pdfCreator.addParagraph("Protein – Found in meat, some beans, and protein supplements. Protein is the building block of muscle. Bodybuilders consume 1.5 to 2 times their weight in lbs in grams of protein. For example, I weigh 200lbs so I should eat 1.5*200 or 300 grams of protein a day. This ensures maximum muscle gain.");
        pdfCreator.addParagraph("Carbohydrates- Found in Potatoes, rice, bread, and in small amounts in vegetables. Carbohydrates are energy. Too much energy that isn’t used is stored as fat. Remember that.");
        
        pdfCreator.addParagraph("Fat- Found in nuts, oils, and small amounts in meat. Fat is essential for health, inflammatory control, blood clotting, and brain development. ");
        await setStateAsync({pdfProgress:50});
        pdfCreator.addHeading2("Losing Fat");
        pdfCreator.addParagraph("To lose fat and preserve muscle, you should decrease carbohydrates and increase protein while cutting total calories. A good macro ratio for fat loss is 30% fat, 40% carbs, and 30% protein. For more information on popular fat loss diets, Lookup the Keto diet or the Paleo diet.");
                
        pdfCreator.addHeading2("Gaining Muscle");
        pdfCreator.addParagraph("To gain muscle and avoid putting on too much fat, you should have a calorie surplus with very high protein. A good macro ratio for muscle gain is 20% fat, 45% carbs, and 35% protein.");


        pdfCreator.addHeading2("Nutrition Summary");
        pdfCreator.addParagraph("These are general guidelines, but there are many different macro ratios and diet plans out there to use. My suggestion is to keep it simple and pick a diet that you can maintain for a long time.");

        //Supplements/////////////////////////////////////////////////
        pdfCreator.addPage();
        pdfCreator.addHeading1("Supplements");

        pdfCreator.addHeading2("Preworkout - For Motivation and Energy");
        pdfCreator.addParagraph("Preworkout should be taken in moderation, but it will give you the motivation and energy needed to complete hard workouts.");

        pdfCreator.addImage(preworkout, 'jpg', 50,50);

        pdfCreator.link("NITROSURGE", "https://amzn.to/2l7o0pe");

        pdfCreator.addHeading2("Protein - For Building or Maintaining Muscle");
        pdfCreator.addParagraph("Protein is very important for building muscle, It is much easier to get the required amount of daily protein by drinking a chocolate protein shake than it is through eating meat alone.");
        
        pdfCreator.addImage(protein, 'jpg', 50,50);
        await setStateAsync({pdfProgress:60});
        pdfCreator.link("Gold Standard 100% Whey Protein", "https://amzn.to/2l7VGDd");

        pdfCreator.addHeading2("Thermogenic - For Burning Fat and Energy")
        pdfCreator.addParagraph("Thermogenics are particularly helpful for burning fat. Thermogenic supplements heat up the body to help burn additional calories throughout the day.");
        

        pdfCreator.addImage(thermo, 'jpg', 50,50);

        pdfCreator.link("Keto Shape Fat Burn Formula", "https://amzn.to/2l3Tix4");

        pdfCreator.addPage();
        //Routines//////////////////////////////////////////////////////////
        pdfCreator.addHeading1("Custom Workout Routine");
        pdfCreator.addParagraph("Generated By: http://www.gainzgenerator.com")
        pdfCreator.addParagraph("Name: "+routinedata.name);
        pdfCreator.addParagraph("Volume: "+routinedata.volume + " rep(s)");
        pdfCreator.addParagraph("Frequency: "+routinedata.frequency+ " time(s) per week");

        var repScheme = routinedata.repScheme.sets+" set(s) of "+
        routinedata.repScheme.reps+" rep(s)";
        pdfCreator.addParagraph("Rep Scheme: "+repScheme);
        pdfCreator.addParagraph("Split: "+routinedata.splitName);
  
        var equipment =  routinedata.exerciseTypes.join(", ");
  
        pdfCreator.addParagraph("Equipment: "+equipment);
        await setStateAsync({pdfProgress:70});
        for (var i in routinedata.workoutDays) {

            var workoutDay = routinedata.workoutDays[i];
            pdfCreator.newLine();

            if (workoutDay.isRest) {
              pdfCreator.addHeading3("Day "+(Number(i)+1)+" - Rest");
            }
            else
            {
                pdfCreator.addHeading3("Day "+(Number(i)+1).toString()+" - "+workoutDay.name);
            }

            for (var j in workoutDay.workouts) {
                var workout = workoutDay.workouts[j];
                var demo = "https://www.google.com/search?q="+workout.exercise.name.replace(" ", "+")
                pdfCreator.link(workout.exercise.name,demo);
            }
        }
        
        //Conclusion/////////////////////////////////////////
        pdfCreator.addPage();
        pdfCreator.addHeading1("Conclusion");
        pdfCreator.addParagraph("You don’t have to remember or completely understand everything in this guide to make progress and become fit. Keep it simple: Follow the routine, watch your nutrition, and continue to push yourself. Slow and steady wins the race. After one year you will look entirely different. Enjoy the process and I wish you the best.");
        pdfCreator.addParagraph("I wish you the best in your fitness journey,");
        pdfCreator.addParagraph("-Wes");

        return pdfCreator.getURI();
    }

    
}

export default PDFCreator;