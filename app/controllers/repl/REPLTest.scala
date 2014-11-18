package controllers.repl

/**
 * Created by rahul on 14/11/14.
 */
import java.io._
import java.net.URLClassLoader
import scala.tools.nsc.{Interpreter, Settings}
import org.apache.spark.repl.SparkILoop
import scala.collection.mutable.ArrayBuffer

/**
 * Created by rahul on 5/11/14.
 */
object REPLTest {

  val settings = new Settings
  settings.usejavacp.value = true

  def runInterpreter(master: String, input: String): String = {
    val CONF_EXECUTOR_CLASSPATH = "spark.executor.extraClassPath"

    val in = new BufferedReader(new StringReader(input + "\n"))
    val out = new StringWriter()
    val cl = getClass.getClassLoader
    var paths = new ArrayBuffer[String]
    if (cl.isInstanceOf[URLClassLoader]) {
      val urlLoader = cl.asInstanceOf[URLClassLoader]
      for (url <- urlLoader.getURLs) {
        if (url.getProtocol == "file") {
          paths += url.getFile
        }
      }
    }

    println("*****  ", paths);

    val classpath = paths.mkString(File.pathSeparator)

    val oldExecutorClasspath = System.getProperty(CONF_EXECUTOR_CLASSPATH)
    System.setProperty(CONF_EXECUTOR_CLASSPATH, classpath)

    val interp = new SparkILoop(in, new PrintWriter(out), master)
    org.apache.spark.repl.Main.interp = interp
    interp.process(Array("-classpath", classpath))
    org.apache.spark.repl.Main.interp = null
    if (interp.sparkContext != null) {
      interp.sparkContext.stop()
    }
    if (oldExecutorClasspath != null) {
      System.setProperty(CONF_EXECUTOR_CLASSPATH, oldExecutorClasspath)
    } else {
      System.clearProperty(CONF_EXECUTOR_CLASSPATH)
    }
    return out.toString
  }

  def main(args: Array[String]) {


    val output = runInterpreter("local",
      """
        |val accum = sc.accumulator(0)
        |sc.parallelize(1 to 10).foreach(x => accum += x)
        |accum.value
      """.stripMargin)

    println(output)
  }





}
