#! /usr/bin/env node
import inquirer from "inquirer"

class Student{
    static counter = 10000;
    id: number;
    name:string;
    courses:string[];
    balance:number;

    constructor(name:string){
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];//Initialize an empty array for courses
        this.balance = 100;
    }
    //method to enroll a student in course
    enroll_course(course:string){
        this.courses.push(course);
    }
    //method to view a student balance
    view_balance(){
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    //method to pay student fees
    pay_fees(amount:number){
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}`);
        console.log(`Remaining Balance : $${this.balance}`);
    }
    //method to display student status
    show_status(){
        console.log(`ID:${this.id}`);
        console.log(`Name:${this.name}`);
        console.log(`Courses:${this.courses}`);
        console.log(`Balance:${this.balance}`)
    }
}
//defining a student_manager class to manage students 
class Student_Manager {
    students:Student[]
    constructor(){
        this.students = [];

    }

    //method to add a new student
    add_student(name:string){
       let student = new Student(name);
       this.students.push(student);
       console.log(`student ${name} added successfully.student ID ${student.id}`);
    }
    //method to enroll in a course 
    enroll_student(student_id:number,course:string){
    let student = this.find_student(student_id);
        if(student){
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully`);


        }

    }
    //method to view a student balance
    view_student_balance(student_id:number){
        let student = this.find_student(student_id);
        if (student){
            student.view_balance();
        }
        else{
            console.log("student not found please enter a correct ID")

        }
       
    }
    //method to pay student fees
    pay_student_fees(student_id:number,amount:number){
        let student =this.find_student(student_id)
        if(student){
            student.pay_fees(amount);

        }
        else{
            console.log("student not found, please enter a correct ID")
        }
    }
    //method to display student status
    show_student_status(student_id:number){
        let student=this.find_student(student_id);
        if(student){
            student.show_status();
        }
    }
    
    //method to find a student by student_id
    find_student(student_id:number){
        return this.students.find(std=>std.id===student_id);

    }

  
}
//main function to run the program
async function main(){
    console .log("Welcome to 'RAFI'_Student Managment System");
    console.log("-".repeat(60));

    let student_manager = new Student_Manager();
    //while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name:"choice",
                type:"list",
                message:"select an option",
                choices:[
                    "Add Students",
                    "Enroll Student",
                    "view Students Balance",
                    "pay Fees",
                    "Show Status",
                    "Exit"

                ]
            }

        ]);
        //using Switch case to handle user choice 
        switch (choice.choice) {
            case "Add Students":
                let name_input = await inquirer.prompt([
                {
                    name:"name",
                    type:"input",
                    message:"Enter a student name",

                }
            ]);
            student_manager.add_student(name_input.name);
                
                break;
                case"Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name:"student_id",
                        type:"number",
                        message:"Enter a student id",
                    },
                    {
                        name:"course",
                        type:"input",
                        message:"Enter a course name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id,course_input.course); 
                     break;
                case "view Students Balance":
                    let balance_input = await inquirer.prompt([
                        {
                            name:"student_id",
                            type:"number",
                            message:"enter a student id",

                        }
                    ]);
                    student_manager.view_student_balance(balance_input.student_id);
                     break;
                case "pay Fees":
                    let fees_input= await inquirer.prompt([
                        {
                            name:"student_id",
                            type:"number",
                            message:"enter a student id",
                        },
                        {
                            name:"amount",
                            type:"number",
                            message:"enter the amount to pay", 
                      
                        }     

                    ]);
                    student_manager.pay_student_fees(fees_input.student_id,fees_input.amount); 
                        break;
                 case"Show Status":
                    let status_input =await inquirer.prompt([
                    {
                        name:"student_id",
                        type:"number",
                        message:"enter a student id",

                    }
                 ]);
                 student_manager.show_student_status(status_input.student_id); 
                 break;
             case"Exit":
                console.log("Exiting...");
                process.exit();
            
        }
        
    }

}
 //calling main function
 main();   







