using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using Newtonsoft.Json;


public class DummyRequest : MonoBehaviour
{
    [SerializeField] private TMP_Text jsonText;

    void Start()
    {
        // Dummy word and direction
        string word = "cat";
        string direction = "engToFra";

        // Create a data object containing the word and direction
        Dictionary<string, string> requestData = new Dictionary<string, string>
        {
            { "word", word },
            { "direction", direction }
        };

        // Convert the data object to JSON string
        string jsonRequest = JsonConvert.SerializeObject(requestData);

        // Set the UI Text component text to the JSON request
        jsonText.text = jsonRequest;
    }
}
