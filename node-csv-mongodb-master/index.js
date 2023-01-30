const csv = require('csv-parser');
const fs = require('fs');
const lstImport = [];

const sprints = {
    Sprint2: {
        "StartDate": "09/01/23",
        "EndDate": "20/02/23",
    },
    Sprint3: {
        "StartDate": "23/02/23",
        "EndDate": "03/02/23",
    },
    Sprint4: {
        "StartDate": "06/02/23",
        "EndDate": "17/03/23",
    },
    Sprint5: {
        "StartDate": "20/02/23",
        "EndDate": "03/03/23",
    },
    Sprint6: {
        "StartDate": "06/03/23",
        "EndDate": "17/03/23",
    },
    Sprint7: {
        "StartDate": "20/03/23",
        "EndDate": "31/03/23",
    },
    Sprint8: {
        "StartDate": "03/04/23",
        "EndDate": "14/04/23",
    },
    Sprint9: {
        "StartDate": "17/04/23",
        "EndDate": "28/04/23",
    },
    Sprint10: {
        "StartDate": "01/05/23",
        "EndDate": "12/05/23",
    }
}

readCsv();

function readCsv() {

    fs.createReadStream('./file/import2.csv')
        .pipe(csv(
            {
                separator: ";"
            }
        )
        )
        .on('data', (row) => { lstImport.push(row); })
        .on('end', () => {
            console.log('CSV file successfully processed')
            transformData(lstImport);
        });
}

function transformData(lstImport) {

    const data = [];
    createHeader(data);

    const objImportDeliverable = {
        Summary: String,
        Description: String,
        Component: String,
        Contractual: String,
        Organização: String,
        DeliverableId: String,
        Assignee: String,
        Deliverable_Type: String,
        Baseline_Start: String,
        Baseline_Draft_Completion: String,
        Baseline_Review_Completion: String,
        Baseline_Closure: String,
        Forecast_Start_Date: String,
        Forecast_Target_Draft_Completion: String,
        Baseline_Start: String,
        Forecast_Target_Review_Completion: String,
        Forecast_Target_Date: String,
        Actual_Start: String,
        Actual_Draft_Completion: String,
        Actual_Review_Completion: String,
        Actual_Closure: String,
        IssueType: String,
        Parent_Id: String,
        Issue_Id: String,
    }

    objImportDeliverable.Component = "1FPay - Back-End \ Time 4",
        objImportDeliverable.Contractual = "No",
        objImportDeliverable.Organização = "ACN",
        objImportDeliverable.DeliverableId = "",
        objImportDeliverable.IssueType = "Deliverable",
        objImportDeliverable.Issue_Id = "",

        lstImport.forEach(issue => {

            objImportDeliverable.Assignee = issue.Assignee + ""
            objImportDeliverable.Parent_Id = issue.Key + ""
            //Especificação Técnica API - Back-End
            prepareModelETAPI(objImportDeliverable);
            // Faltam as Datas
            objImportDeliverable.Baseline_Start = '01/01/2023',
                objImportDeliverable.Baseline_Draft_Completion = '01/01/2023',
                objImportDeliverable.Baseline_Review_Completion = '01/01/2023',
                objImportDeliverable.Baseline_Closure = '01/01/2023',
                objImportDeliverable.Forecast_Start_Date = '01/01/2023',
                objImportDeliverable.Forecast_Target_Draft_Completion = '01/01/2023',
                objImportDeliverable.Baseline_Start = '01/01/2023',
                objImportDeliverable.Forecast_Target_Review_Completion = '01/01/2023',
                objImportDeliverable.Forecast_Target_Date = '01/01/2023',
                objImportDeliverable.Actual_Start = '01/01/2023',
                objImportDeliverable.Actual_Draft_Completion = '01/01/2023',
                objImportDeliverable.Actual_Review_Completion = '01/01/2023',
                objImportDeliverable.Actual_Closure = '01/01/2023',
                data.push(getCsv(objImportDeliverable));

            // //Configuração API Gateway - Back-End
            // prepareModelConfigAPIGateway(objImportDeliverable);
            // // Faltam as Datas
            // data.push(objImportDeliverable);

            // //Dev - Codificar Lambda
            // prepareModelDevCodLambda(objImportDeliverable);
            // // Faltam as Datas
            // data.push(objImportDeliverable);

            // //Teste Local
            // prepareModelTesteLocal(objImportDeliverable);
            // // Faltam as Datas
            // data.push(objImportDeliverable);

            // //Deploy + Teste Ambiente QA
            // prepareModelDeployQA(objImportDeliverable);
            // // Faltam as Datas
            // data.push(objImportDeliverable);

            // //Code Review
            // prepareModelCodeReview(objImportDeliverable);
            // // Faltam as Datas
            // data.push(objImportDeliverable);
        });

    fs.writeFile("./file/data.csv", data.join("\r\n"), "ascii", (err) => {
        if (err) console.log(err);
        else console.log("Data saved");
    });
}

function createHeader(data) {

    const header = "Summary (Resumo);" +
        "Description (repetir o resumo);" +
        "Component (time);" +
        "Contractual;" +
        "Organização Resposavel pelo Deliverable;" +
        "Deliverable ID;" +
        "Assignee (Owner);" +
        "Deliverable Type;" +
        "Baseline Start;" +
        "Baseline Draft Completion;" +
        "Baseline Review Completion;" +
        "Baseline Closure;" +
        "Forecast - Start Date;" +
        "Forecast - Target Draft Completion;" +
        "Forecast -  Target Review Completion;" +
        "Forecast - Target Date;" +
        "Actual Start;" +
        "Actual Draft Completion;" +
        "Actual Review Completion;" +
        "Actual Closure;" +
        "IssueType (Tipo de Item);" +
        "Parent Id (Id Principal);" +
        "Issue Id (ID da Item);"

    data.push(header);
}

function getBaselineDates(issue) {

}

function prepareModelETAPI(objImportDeliverable) {
    objImportDeliverable.Summary = "Especificação Técnica API - Back-End"
    objImportDeliverable.Description = "Especificação Técnica API - Back-End"
    objImportDeliverable.Deliverable_Type = "Especificação Técnica API - Back-End"
}

function prepareModelConfigAPIGateway(objImportDeliverable) {
    objImportDeliverable.Summary = "Configuração API Gateway - Back-End"
    objImportDeliverable.Description = "Configuração API Gateway - Back-End"
    objImportDeliverable.Deliverable_Type = "Configuração API Gateway - Back-End"
}

function prepareModelDevCodLambda(objImportDeliverable) {
    objImportDeliverable.Summary = "Dev - Codificar Lambda"
    objImportDeliverable.Description = "Dev - Codificar Lambda"
    objImportDeliverable.Deliverable_Type = "Codificar Lambda Baseado na Especificação Funcional e Especificação Técnica (Código + Teste Unitário + Arquitetura)  - Back-End"
}

function prepareModelTesteLocal(objImportDeliverable) {
    objImportDeliverable.Summary = "Teste Local"
    objImportDeliverable.Description = "Teste Local"
    objImportDeliverable.Deliverable_Type = "Executar Teste Integrado em Ambiente Local - Back-End"
}

function prepareModelDeployQA(objImportDeliverable) {
    objImportDeliverable.Summary = "Deploy + Teste Ambiente QA"
    objImportDeliverable.Description = "Deploy + Teste Ambiente QA"
    objImportDeliverable.Deliverable_Type = "Deploy + Teste Integrado + AWS Dev - Back-End"
}

function prepareModelCodeReview(objImportDeliverable) {
    objImportDeliverable.Summary = "Code Review"
    objImportDeliverable.Description = "Code Review"
    objImportDeliverable.Deliverable_Type = "Codificar Lambda Baseado na Especificação Funcional e Especificação Técnica (Código + Teste Unitário + Arquitetura)  - Back-End"
}

function getCsv(objImportDeliverable) {
    return Object.values(objImportDeliverable).map(x => x).join(";");

}