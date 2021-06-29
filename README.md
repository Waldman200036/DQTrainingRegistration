# DQMCTraining on Bitnami Stack image

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
       ___ _ _                   _
      | _ |_) |_ _ _  __ _ _ __ (_)
      | _ \ |  _| ' \/ _` | '  \| |
      |___/_|\__|_|_|\__,_|_|_|_|_|

  *** Welcome to the Bitnami MEAN 4.2.8-28                              ***
  *** Documentation:  https://docs.bitnami.com/aws/infrastructure/mean/ ***
  ***                 https://docs.bitnami.com/aws/                     ***
  *** Bitnami Forums: https://community.bitnami.com/                    ***


## New Server Load Script
       mkdir /opt/bitnami/projects
       sudo chown $USER /opt/bitnami/projects
       cd /opt/bitnami/projects
       git clone https://github.com/Waldman200036/DQMCTraining.git
       cd DQMCTraining
       npm i
       forever start /opt/bitnami/projects/DQMCTraining/bin/www
       sudo cp /opt/bitnami/apache/conf/vhosts/sample-http-vhost.conf.disabled /opt/bitnami/apache/conf/vhosts/DQMCTraining-http-vhost.conf
       sudo cp /opt/bitnami/apache/conf/vhosts/sample-https-vhost.conf.disabled /opt/bitnami/apache/conf/vhosts/DQMCTraining-https-vhost.conf
       sudo /opt/bitnami/ctlscript.sh restart apache


## Questionnaire Data Structure
       [{
       Questions: {
              
                     _id: object,
                     questionText: 'text',
                     timestamp: value,
              
       },       
              Options:{

                     option_id: object,
                     option0: 'text',
                     option1: 'text',
                     option2: 'text',
                     option3: 'text',
                     option4: 'text',
                     question_id: object,                          
              },
                
              Answers: [
                     {
                            answer_id: object,
                            answer: 'text',
                            questionid: object,
                            timestamp: value,
                     },

              ]
       }]


                     
## 1 Conection to Client Web Server
 ssh -i "~/projects/keys/Bitnami_Server_Key_Pair.pem" bitnami@ec2-34-232-65-80.compute-1.amazonaws.com

 ### Create tunnels
 ssh -N -L 8888:127.0.0.1:4000 -i "~/projects/keys/Bitnami_Server_Key_Pair.pem" bitnami@ec2-34-232-65-80.compute-1.amazonaws.com

 ssh -N -L 8889:127.0.0.1:5000 -i "~/projects/keys/Bitnami_Server_Key_Pair.pem" bitnami@ec2-34-232-65-80.compute-1.amazonaws.com

## 2 Connection to MySQL Database
shell> mysqlsh --mysql -u admin -h mysql-database-1.c62lpekhphxj.us-east-1.rds.amazonaws.com -P 3306

#### You can also specify the connection protocol as an option rather than as part of the URI-like connection string, for example:
shell> mysqlsh --mysql --uri user@localhost:3306

For instructions and examples to connect to a MySQL Server instance in this way, see Connecting to the Server Using URI-Like Strings or Key-Value Pairs.https://dev.mysql.com/doc/refman/8.0/en/connecting-using-uri-or-key-value-pairs.html

For more information see Creating the Session Global Object After Starting MySQL Shell at https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-sessions-after.html

## 3 Connecting to Python


#### Step 3.1 Create python environment
       $ python3 -m venv venv

#### Step 3.2 Activate the environment
       $ source venv/bin/activate

From inside your Python 3.6 virtualenv environment, pip3 install the module for your database client that gets imported in your code sample. Database	Module to install using pip3 MySQL	
       $ pip3 install pymysql

#### 3.3 Install SPARQLWrapper
       pip3 install SPARQLWrapper

### Step 4: Test the provided Python code from the command line on your client host
#### Set environment variables for a command-line test:

MySQL and PostgreSQL:

       export ENDPOINT='mysql-database-1.c62lpekhphxj.us-east-1.rds.amazonaws.com'
       MYSQL_HOST

       export PORT='3306'
       MYSQL_TCP_PORT

       export DBUSER='admin'

       export DBPASSWORD='your-database-user-password'
       MYSQL_PWD

       export DATABASE='mysql-database-1'
