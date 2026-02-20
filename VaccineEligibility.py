from py_rules.components import Condition, Result, Rule
from py_rules.engine import RuleEngine
from datetime import date

# def Hib(Patient):
#     condition = Condition('age', '>', 6) & Condition('age', '<', 59)
#     # Create a condition

#     doNotAdminister = ["Asplenia" , "hyposplenism" , "Cancer" , "HIV"  , "Hemoglobinopathies" , "HIV" ]


#     # Create a result
#     result = Result('message', 'str', 'Eligible for vaccine!')

#     rule = Rule('Hib').If(condition).Then(result)

#     # initialise a new instance of RuleEngine with context
#     context = {'age': Patient["age"]}

#     engine = RuleEngine(context)

#     return (engine.evaluate(rule))
#     # Eligible for vaccine!

# def PolioEligibility(Patient):
#     condition = Condition('age', '>', 48) & Condition('age', '<', 84)
#     # Create a condition


#     # Create a result
#     result = Result('message', 'str', 'Eligible for vaccine!')

#     rule = Rule('Polio').If(condition).Then(result)

#     # initialise a new instance of RuleEngine with context
#     context = {'age': Patient["age"]}

#     engine = RuleEngine(context)

#     return (engine.evaluate(rule))
#     # Eligible for vaccine!

# def Rotavirus(Patient):
#     FirstDoseCondition = Condition('age', '>', 1.3) & Condition('age', '<', 3.5)

#     FirstDoseDate = Patient["Medical History"]["Rotavirus First Dose"]

#     today = date.today()

#     firstDoseCompletedCondition = Condition('age', '>', 1.3)
#     SecondDoseCondition = Condition()
#     # Create a condition

#     # Create a result
#     result = Result('message', 'str', 'Eligible for vaccine!')

#     rule = Rule('Polio').If(condition).Then(result)

#     # initialise a new instance of RuleEngine with context
#     context = {'age': Patient["age"]}

#     engine = RuleEngine(context)

#     return (engine.evaluate(rule))
#     # Eligibility for vaccine!

def MMRV(Patient):
    condition =  Condition('age', '<', 144)
    # Create a condition

    # Create a result
    result = Result('message', 'str', 'Eligible for MMRV vaccine!')

    rule = Rule('MMRV').If(condition).Then(result)

    # initialise a new instance of RuleEngine with context
    context = {'age': Patient["age"]}

    engine = RuleEngine(context)

    return (engine.evaluate(rule))
    # Eligible for vaccine!

def IPV(Patient) :
    condition =  Condition('age', '<', 216)

    conditions = Patient["Chronic Condtions"]

    search_string = "unimmunised"

    if not (("Unimmunized" in conditions) or ("Incompletely immunized" in conditions) ): 
        return False
    
    result = Result('message', 'str', 'Eligible for IPV vaccine!')

    rule = Rule('IPV').If(condition).Then(result)

    # initialise a new instance of RuleEngine with context
    context = {'age': Patient["age"]}

    engine = RuleEngine(context)

    return (engine.evaluate(rule))

def Varicella(Patient):
    
    patientConditions = Patient["Chronic Condtions"]

    searchStrings = ["chronic salicylate therapy" , "HIV"  , "Dialysis" , "Cystic fibrosis" , "Organ transplant" , "Cancer"]

    diseaseCondition = False

    for i in patientConditions:
        if (i in searchStrings):
            diseaseCondition = True
    
    condition =  Condition('age', '<', 192) | Condition('diseaseCondition' , '==' , 1)
    
    result = Result('message', 'str', 'Eligible for Varicella vaccine!')

    rule = Rule('Varicella').If(condition).Then(result)

    # initialise a new instance of RuleEngine with context
    context = {'age': Patient["age"] , 'diseaseCondition' : diseaseCondition}

    engine = RuleEngine(context)

    return (engine.evaluate(rule))

