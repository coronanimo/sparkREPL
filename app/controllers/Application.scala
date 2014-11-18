package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.functional.syntax._
import controllers.repl.REPLTest._


object Application extends Controller {


  implicit val rds = (
    (__ \ 'name).read[String] and
      (__ \ 'age).read[Long]
    ) tupled



  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }


  def workbook = Action {

    Ok(views.html.workbook("StreamVector WorkBook !!"))
  }

  def scriptletCall = Action(BodyParsers.parse.json) {
    request =>
      println(request.body)

      val output = runInterpreter("local",
        """
          |val accum = sc.accumulator(0)
          |sc.parallelize(1 to 10).foreach(x => accum += x)
          |accum.value
        """.stripMargin)

      println(output)


    Ok(" ");
  }

/*  def savePlace = Action(BodyParsers.parse.json) { request =>
    val placeResult = request.body.validate[Place]
    placeResult.fold(
      errors => {
        BadRequest(Json.obj("status" ->"KO", "message" -> JsError.toFlatJson(errors)))
      },
      place => {
        Place.save(place)
        Ok(Json.obj("status" ->"OK", "message" -> ("Place '"+place.name+"' saved.") ))
      }
    )
  }*/

}