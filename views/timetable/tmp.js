<% var timetext=""; %>
                                        <% for ( schedules in courses) { //과목 스케줄 리스트 - 시간 %>
                                        <%      var text = courseDay(schedules.day) +' '+ schedules.start_time +'-'+ schedules.end_time; %>
                                        <%      timetext = timetext + text + '<br>'; %>
                                        <% } %>
                                        <% var typetext=""; %>
                                        <% for (var j=0; j<course[i].schedules.length; j++) {  %>
                                        <% %>
                                        <% %>
                                        <% %>
                                        <script>
                                            
                                                
                                            var typetext="";
                                            for (var j=0; j<course[i].schedules.length; j++) { //과목 스케줄 리스트 - 타입
                                                var text = courseType(course[i].schedules[j].course_type, course[i].schedules[j].classroom);
                                                typetext = typetext + text + '<br>';
                                            }
                                        </script>
                                        <td><%=courses.schedules 중에서 과목 시간 %></td>
                                        <td><%=courses.schedules 중에서 과목 타입 %></td>