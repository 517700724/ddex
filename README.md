# ddex

    git init


2.就是将目录下的所有文件上传，也可以将“.”换成具体的文件名

     git add .


3.将项目提交到gitHub

     git commit -m "注释语句"  


 4.在github上创建新的repository
 5.点击 “Create repository”跳转到一个连接，如下红色圈获取到本项目的github地址
 
 
 6.将本地的代码关联到github上
 
      git remote add origin 项目的github地址  
 
 
  7.上传代码到github之前需要先pull 
  
       git pull origin master
  
  
   8.上传代码到远程仓库
   
         git push -u origin master  
   
   之后输入账号，密码,上传到github
