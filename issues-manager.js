var issueList={
 issues:[],
 displayIssues : function (){

    if(this.issues.length==0) { 
        console.log('This List of Issues is empty');
    }
    else{
     var IssueStatus='';
     for(i=0;i<this.issues.length;i++){
         var issue=this.issues[i]
         if(issue.completed== true){
         IssueStatus='(x)'+issue.issueName;
        }else{
            IssueStatus='( )'+issue.issueName;
        }
       console.log(IssueStatus);
     }

    }
     
 },
 addIssue: function(issueName){
     this.issues.push({
         issueName:issueName,
         completed:false
     });
    
 },
changeIssue:function(possition,issuetext){
this.issues[possition].issueName=issuetext;
},

deleteIssue:function(possition){
    this.issues.splice(possition,1);
    
},

toggleComplete:function(possition){
   var issue=this.issues[possition];
   issue.completed=!issue.completed;
   
},

toggleAll:function (){
    var totalIsues=this.issues.length;
    var completeIsues=0;
    for(i=0;i<totalIsues;i++){
        if(this.issues[i].completed==true){
            completeIsues++;
        }
    }
    if(totalIsues==completeIsues){
        for(i=0;i<totalIsues;i++){
            this.issues[i].completed=false;
        }
    }else{
        for(i=0;i<totalIsues;i++){
            this.issues[i].completed=true;
        }
    }
    
}

};

var handlers={
  
     displayIssues:function(){
        issueList.displayIssues();
     },

     toggleAll:function(){
         
         issueList.toggleAll();
         view.displayIssues();
     },
   
     addIssue:function(){
         var issueName=document.getElementById('addIssueName');
           issueList.addIssue(issueName.value);
           view.displayIssues();
           issueName.value='';
     },

     changeIssue:function(){
         var changedIssueNameInput=document.getElementById('changedIssueNameInput');
         var changedIssuepositionInput=document.getElementById('changedIssuepositionInput');
         issueList.changeIssue(changedIssuepositionInput.value-1,changedIssueNameInput.value);
         view.displayIssues();
         changedIssuepositionInput.value='';
         changedIssueNameInput.value='';
         
     },

     deleteIssue:function(possition){
        
         issueList.deleteIssue(possition);
         view.displayIssues();
         
     },

     toggleComplete:function(){
         var toggleCompletepositon=document.getElementById('toggleComplete');
        issueList.toggleComplete(toggleCompletepositon.value-1);
        view.displayIssues();
        toggleCompletepositon.value='';
        
     }

}

var view={
    displayIssues: function(){
        var issueUi=document.querySelector('ul');
        issueUi.innerHTML='';
        for(i=0;i<issueList.issues.length;i++){
            var issueLi=document.createElement('li');
            var issue= issueList.issues[i];
            var issuecomplete = '';
            if(issue.completed === true){
                issuecomplete= '✓   ' + issue.issueName;
            }else{
                issuecomplete='X   ' + issue.issueName;
            }
            issueLi.id=i;
            issueLi.textContent=issuecomplete;
            issueLi.appendChild(this.createDeleteButton());
            issueUi.appendChild(issueLi);
        }
       
    },

    createDeleteButton: function(){
    var deleteButton;
    deleteButton=document.createElement('button');
    deleteButton.textContent='Delete';
    deleteButton.className='deleteIssue';
    return deleteButton;

    },

    setUpevent:function(){
        var issuesUI=document.querySelector('ul');
        issuesUI.addEventListener('click',function(event){
        
          var eventholder =event.target
          console.log(eventholder)
          if(eventholder.className='deleteIssue'){
               handlers.deleteIssue(parseInt(eventholder.parentNode.id));}
    
        })
    }


};


view.setUpevent();


