import { test, expect } from "@playwright/test";
import miselementos from "../selectores/mis_selectores"; // importo los selectores
const { asercionTitulo, asercionTexto } = require("../metodos/pom");
const fs = require("fs"); // incorporar la librería fs (File System = manejo de archivos)
var archivo = "./datos/pruebas.json"; // conecto con el archivo
var archivoJson = JSON.parse(fs.readFileSync(archivo)); // procesar el archivo en formato Json

test.beforeEach("voy a la web", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
});

test("Sauce test", async ({ page }) => {
  for (const usu_y_clave of archivoJson.casos) {
    // lee de un renglon a la vez
    var { usuario, clave } = usu_y_clave;

    await page.locator(miselementos.elementos.txt_usuario).fill(usuario);
    await page.locator(miselementos.elementos.txt_clave).fill(clave);
    await page.locator(miselementos.elementos.btn_ingresar).click();
    await page
      .getByRole(miselementos.elementos.btn_menu.btn_role, {
        name: miselementos.elementos.btn_menu.btn_nombre,
      })
      .click();
    await page.locator(miselementos.elementos.btn_out).click();
    asercionTitulo(page, "Swag Labs");
    const mensajeTexto = await page
      .locator(miselementos.elementos.mensaje)
      .textContent();
    asercionTexto(mensajeTexto, "Password for all users:");
  }
});
