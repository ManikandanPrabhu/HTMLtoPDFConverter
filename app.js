var express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require('path'),
    htmlToPdf = require('html-to-pdf'),
    bodyParser = require('body-parser');


var port = process.env.PORT||3000; //which you can run both on Azure or local

// __dirname will use the current path from where you run this file 
app.use(express.static(__dirname));
// Use Body Parser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Server Running Port: 8000
app.listen(port);
console.log('Listening on port '+port);

app.set('view engine', 'html');



var currentFile = 'newFile_' + new Date().getTime() + '.pdf';
//Call this post method with req.body.userData(HTMLString)
app.post('/sample', function (req,res) {
    console.log("Logged User Data:::", req.body);
   
      var newData = req.body.userData;
   
    // Convert HTMLString to PDF
    htmlToPdf.convertHTMLString(newData, currentFile,
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log('Woot! Success!');
                var readData = fs.readFileSync(currentFile, 'base64');
                res.send(readData);

                //To Remove the file from the server Location
                fs.unlink(__dirname + '/' + currentFile);
            }
        }
    );
});

// Hardcode the HTML data here
var rawData = `<h1> Welcome to PDF Conversion </h1>
  <p><strong>Apollo 11</strong> was the spaceflight that landed the first humans, Americans <a href="http://en.wikipedia.org/wiki/Neil_Armstrong">Neil Armstrong</a> and <a href="http://en.wikipedia.org/wiki/Buzz_Aldrin">Buzz Aldrin</a>, on the Moon on July 20, 1969, at 20:18 UTC. Armstrong became the first to step onto the lunar surface 6 hours later on July 21 at 02:56 UTC.</p>

<p>Armstrong spent about <s>three and a half</s> two and a half hours outside the spacecraft, Aldrin slightly less; and together they collected 47.5 pounds (21.5&nbsp;kg) of lunar material for return to Earth. A third member of the mission, <a href="http://en.wikipedia.org/wiki/Michael_Collins_(astronaut)">Michael Collins</a>, piloted the <a href="http://en.wikipedia.org/wiki/Apollo_Command/Service_Module">command</a> spacecraft alone in lunar orbit until Armstrong and Aldrin returned to it for the trip back to Earth.</p>

<h2>Broadcasting and <em>quotes</em> <a id="quotes" name="quotes"></a></h2>

<p>Broadcast on live TV to a world-wide audience, Armstrong stepped onto the lunar surface and described the event as:</p>

<blockquote>
<p>One small step for [a] man, one giant leap for mankind.</p>
</blockquote>

<p>Apollo 11 effectively ended the <a href="http://en.wikipedia.org/wiki/Space_Race">Space Race</a> and fulfilled a national goal proposed in 1961 by the late U.S. President <a href="http://en.wikipedia.org/wiki/John_F._Kennedy">John F. Kennedy</a> in a speech before the United States Congress:</p>

<blockquote>
<p>[...] before this decade is out, of landing a man on the Moon and returning him safely to the Earth.</p>
</blockquote>

<h2>Technical details <a id="tech-details" name="tech-details"></a></h2>

<table align="right" border="1" bordercolor="#ccc" cellpadding="5" cellspacing="0" style="border-collapse:collapse">
<caption><strong>Mission crew</strong></caption>
<thead>
  <tr>
        <th scope="col">Position</th>
        <th scope="col">Astronaut</th>
  </tr>
</thead>

<tbody>
  <tr>
        <td>Commander</td>
        <td>Neil A. Armstrong</td>
  </tr>
  <tr>
        <td>Command Module Pilot</td>
        <td>Michael Collins</td>
  </tr>
  <tr>
        <td>Lunar Module Pilot</td>
        <td>Edwin &quot;Buzz&quot; E. Aldrin, Jr.</td>
  </tr>
</tbody>
</table>

<p>Launched by a <strong>Saturn V</strong> rocket from <a href="http://en.wikipedia.org/wiki/Kennedy_Space_Center">Kennedy Space Center</a> in Merritt Island, Florida on July 16, Apollo 11 was the fifth manned mission of <a href="http://en.wikipedia.org/wiki/NASA">NASA</a>&#39;s Apollo program. The Apollo spacecraft had three parts:</p>

<ol>
  <li><strong>Command Module</strong> with a cabin for the three astronauts which was the only part which landed back on Earth</li>
  <li><strong>Service Module</strong> which supported the Command Module with propulsion, electrical power, oxygen and water</li>
    <li><strong>Lunar Module</strong> for landing on the Moon.</li>
</ol>

<p>After being sent to the Moon by the Saturn V&#39;s upper stage, the astronauts separated the spacecraft from it and travelled for three days until they entered into lunar orbit. Armstrong and Aldrin then moved into the Lunar Module and landed in the <a href="http://en.wikipedia.org/wiki/Mare_Tranquillitatis">Sea of Tranquility</a>. They stayed a total of about 21 and a half hours on the lunar surface. After lifting off in the upper part of the Lunar Module and rejoining Collins in the Command Module, they returned to Earth and landed in the <a href="http://en.wikipedia.org/wiki/Pacific_Ocean">Pacific Ocean</a> on July 24.</p>

<hr />
<p><small>Source: <a href="http://en.wikipedia.org/wiki/Apollo_11">Wikipedia.org</a></small></p>

</body>

   <p><strong>Apollo 11</strong> was the spaceflight that landed the first humans, Americans <a href="http://en.wikipedia.org/wiki/Neil_Armstrong">Neil Armstrong</a> and <a href="http://en.wikipedia.org/wiki/Buzz_Aldrin">Buzz Aldrin</a>, on the Moon on July 20, 1969, at 20:18 UTC. Armstrong became the first to step onto the lunar surface 6 hours later on July 21 at 02:56 UTC.</p>

<p>Armstrong spent about <s>three and a half</s> two and a half hours outside the spacecraft, Aldrin slightly less; and together they collected 47.5 pounds (21.5&nbsp;kg) of lunar material for return to Earth. A third member of the mission, <a href="http://en.wikipedia.org/wiki/Michael_Collins_(astronaut)">Michael Collins</a>, piloted the <a href="http://en.wikipedia.org/wiki/Apollo_Command/Service_Module">command</a> spacecraft alone in lunar orbit until Armstrong and Aldrin returned to it for the trip back to Earth.</p>

<h2>Broadcasting and <em>quotes</em> <a id="quotes" name="quotes"></a></h2>

<p>Broadcast on live TV to a world-wide audience, Armstrong stepped onto the lunar surface and described the event as:</p>

<blockquote>
<p>One small step for [a] man, one giant leap for mankind.</p>
</blockquote>

<p>Apollo 11 effectively ended the <a href="http://en.wikipedia.org/wiki/Space_Race">Space Race</a> and fulfilled a national goal proposed in 1961 by the late U.S. President <a href="http://en.wikipedia.org/wiki/John_F._Kennedy">John F. Kennedy</a> in a speech before the United States Congress:</p>

<blockquote>
<p>[...] before this decade is out, of landing a man on the Moon and returning him safely to the Earth.</p>
</blockquote>

<h2>Technical details <a id="tech-details" name="tech-details"></a></h2>

<table align="right" border="1" bordercolor="#ccc" cellpadding="5" cellspacing="0" style="border-collapse:collapse">
<caption><strong>Mission crew</strong></caption>
<thead>
  <tr>
    <th scope="col">Position</th>
      <th scope="col">Astronaut</th>
  </tr>
</thead>
<tbody>
    <tr>
        <td>Commander</td>
        <td>Neil A. Armstrong</td>
    </tr>
    <tr>
        <td>Command Module Pilot</td>
        <td>Michael Collins</td>
    </tr>
    <tr>
        <td>Lunar Module Pilot</td>
        <td>Edwin &quot;Buzz&quot; E. Aldrin, Jr.</td>
    </tr>
</tbody>
</table>

<p>Launched by a <strong>Saturn V</strong> rocket from <a href="http://en.wikipedia.org/wiki/Kennedy_Space_Center">Kennedy Space Center</a> in Merritt Island, Florida on July 16, Apollo 11 was the fifth manned mission of <a href="http://en.wikipedia.org/wiki/NASA">NASA</a>&#39;s Apollo program. The Apollo spacecraft had three parts:</p>

<ol>
    <li><strong>Command Module</strong> with a cabin for the three astronauts which was the only part which landed back on Earth</li>
    <li><strong>Service Module</strong> which supported the Command Module with propulsion, electrical power, oxygen and water</li>
    <li><strong>Lunar Module</strong> for landing on the Moon.</li>
</ol>

<p>After being sent to the Moon by the Saturn V&#39;s upper stage, the astronauts separated the spacecraft from it and travelled for three days until they entered into lunar orbit. Armstrong and Aldrin then moved into the Lunar Module and landed in the <a href="http://en.wikipedia.org/wiki/Mare_Tranquillitatis">Sea of Tranquility</a>. They stayed a total of about 21 and a half hours on the lunar surface. After lifting off in the upper part of the Lunar Module and rejoining Collins in the Command Module, they returned to Earth and landed in the <a href="http://en.wikipedia.org/wiki/Pacific_Ocean">Pacific Ocean</a> on July 24.</p>

<hr />
<p><small>Source: <a href="http://en.wikipedia.org/wiki/Apollo_11">Wikipedia.org</a></small></p>

</body>`;
app.get('/firstPage', function(req,res) {
    console.log("firstPage");
    // Convert HTMLString to PDF
    htmlToPdf.convertHTMLString(rawData, currentFile,
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log('Woot! Success!');
                var readData = fs.readFileSync(currentFile, 'base64');
                res.send(readData);

                //To Remove the file from the server Location
                fs.unlink(__dirname + '/' + currentFile);
            }
        }
    );
});

app.get('/demo', function(req,res) {
    console.log("in demo");  
    res.sendFile(path.join(__dirname, 'index.html'));
});