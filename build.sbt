name := """sparkREPL"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.10.4"

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache,
  ws
)

libraryDependencies ++= Seq(
  "org.webjars" %% "webjars-play" % "2.3.0-2",
  "org.webjars" % "jquery" % "2.1.1",
  "org.webjars" % "bootstrap" % "3.1.1-2",
  "org.webjars" % "font-awesome" % "4.2.0",
  "org.webjars" % "angularjs" % "1.3.2",
  "org.webjars" % "d3js" % "3.4.13",
  "org.webjars" % "ace" % "01.08.2014",
  "org.webjars" % "angular-ui-ace" % "0.1.1-1",
  "org.webjars" % "angular-ui-bootstrap" % "0.11.2",
  "org.webjars" % "angular-ui-sortable" % "0.12.11-1",
  "org.webjars" % "angular-dragdrop" % "1.0.3",
  "org.webjars" % "bootstrap-glyphicons" % "bdd2cbfba0"
)

libraryDependencies += "org.scala-lang" % "scala-compiler" % "2.10.4"

libraryDependencies += "org.scala-lang" % "scala-library" % "2.10.4"

libraryDependencies += "org.scala-lang" % "jline" % "2.10.4"

libraryDependencies += "org.apache.spark" % "spark-core_2.10" % "1.1.0"

libraryDependencies += "org.apache.spark" % "spark-repl_2.10" % "1.1.0"

