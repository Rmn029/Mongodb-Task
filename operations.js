const assert = require('assert');
const mongoose = require('mongoose');
const Task = require('../models/task');

//Describe Our tests
describe('Operations in our Records', function(){

  beforeEach(function(done){
    mongoose.connection.collections.tasks.drop(function(){
      done();
    });
  });


  // Create Tests
  it('Create a Task with the Completion', function(){
    var t1 = new Task({
      Description: "Do Coding for 2hr",
      Completed: true
    });

    var t2 = new Task({
      Description: "Do Exercise for 1hr",
      Completed: false
    });
    
     var t3 = new Task({
      Description: "Watch Web Series",
      Completed: true
    });
    var t4 = new Task({
      Description: "Listen Music",
      Completed: false
    });

    t1.save();

    t2.save();
    
    t3.save();
    t4.save();
  });


  //Reading Records which have Completes === false
  
  it('Reading the value of the Task', function(done){
    var t1 = new Task({
      Description: "Do Coding for 2hr",
      Completed: true
    });

    var t2 = new Task({
      Description: "Do Exercise for 1hr",
      Completed: false
    });
    
    var t3 = new Task({
      Description: "Watch Web Series",
      Completed: true
    });
    var t4 = new Task({
      Description: "Listen Music",
      Completed: false
    });

    t1.save();

    t2.save().then(function(){
       Task.findOne({Completed: false}).then(function(result){ 
         assert(result.Completed === false);
         done();
      });
    });
    t4.save().then(function(){
       Task.findOne({Completed: false}).then(function(result){ 
         assert(result.Completed === false);
         done();
      });
    });
  });




   //Update the Record 
   it('Update the value of the Task', function(){
    var t1 = new Task({
      Description: "Do Coding for 2hr",
      Completed: true
    });

    var t2 = new Task({
      Description: "Do Exercise for 1hr",
      Completed: false
    });
     
     var t3 = new Task({
      Description: "Watch Web Series",
      Completed: true
    });
    var t4 = new Task({
      Description: "Listen Music",
      Completed: false
    });

    t1.save();

    t2.save().then(function(done){
      Task.findOneUpdate({Completed: false}, {Completed: true}).then(function(){
        Task.findOne({name: 'Do Exercise for 1hr'}).then(function(result){
          asssert(result.Completed === true);
          done();
        });
      });
    });
     t4.save().then(function(done){
      Task.findOneUpdate({Completed: false}, {Completed: true}).then(function(){
        Task.findOne({name: 'Listen Music'}).then(function(result){
          asssert(result.Completed === true);
          done();
        });
      });
    });
  });



  //Delete the Record

  it('Deleting the value of the Task', function(){
    var t1 = new Task({
      Description: "Do Coding for 2hr",
      Completed: true
    });

    var t2 = new Task({
      Description: "Do Exercise for 1hr",
      Completed: false
    });
    
    var t3 = new Task({
      Description: "Watch Web Series",
      Completed: true
    });
    var t4 = new Task({
      Description: "Listen Music",
      Completed: false
    });

    t1.save();
    t3.save();
    t4.save();

    t2.save().then(function(done){
      Task.findOneAndRemove({Description: 'Do Exercise for 1hr'}).then(function(){
        Task.findOne({Description: 'Do Exercise for 1hr'}).then(function(result){
          asssert(result === null);
          done();
        });
      });
    });
  });

});